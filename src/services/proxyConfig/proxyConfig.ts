import { CruiseControlItem, DataCenter } from 'api/types'
import type { ProxyPort } from 'utils/types'
import { reduceAllowlist } from 'utils/reduceAllowlist'
import type { GetState, AppDispatch } from 'state/store'
import {
  setStatus,
  setProxy,
  setCurrentIp,
  setReconnectionAttempts,
  setConnectionError,
} from 'state/slices/proxy'
import type { Host } from 'api/types'
import { checkIp, createNotification } from 'services'
import { addOverlay } from 'state/slices/overlay'
import {
  ACCOUNT_STATES,
  ACCOUNT_PLAN,
  locationWarpScriptId,
  languageWarpScriptId,
  timeZoneWarpScriptId,
} from 'utils/constants'
import { applyBestLocationAsAutopilot, setAutopilotSelected } from 'state/slices/autopilot'
import { setCurrentLocation } from 'state/slices/currentLocation'
import { setCurrentDataCenter } from 'state/slices/currentDataCenter'

import proxyOffIcon from 'assets/img/proxyOff.png'
import proxyOnIcon from 'assets/img/proxyOn.png'
import { pushToDebugLog } from 'services/debugLog'
import { clearConnectedThisSession, setConnectedThisSession } from 'services/connectedThisSession'
import { getLocalizedMessage } from 'utils/getLocalisedString'

import transformAllowListToExcludeMatches from 'utils/transformAllowListToExcludeMatches'
import { doesBundleExistInBuild, registerScript, unregisterScript } from 'utils/scriptController'
import { SHA256 } from 'crypto-js'
import { getBundleNamePostFix } from 'utils/getBundleName'
import { getNearestValidDataCenter } from 'utils/getNearestValidLocation'
import shuffle from 'lodash.shuffle'
import { NO_IP } from 'services/proxyAuth/checkIp'
import { serializeError } from 'serialize-error'

// get array of hosts if exists (used for fallbacks)
const getProxyList = (hosts: Host[], proxyPort: ProxyPort) => {
  if (hosts?.length > 0) {
    return hosts.reduce((proxyList: string, host: Host) => {
      //convert each into proxy list format
      proxyList += `HTTPS ${host.hostname}:${proxyPort};`
      return proxyList
    }, '')
  } else {
    return null
  }
}

const createFindProxyForURLFunction = (
  hosts: Host[],
  allowlist: string[],
  proxyPort: ProxyPort,
  cruiseControlList?: CruiseControlItem[],
  workingApi?: string,
) => {
  return `
  function FindProxyForURL (url, host) {

    alert('proxy url: ' + url)
    alert('host: ' + host)
    
    const userAllowlist = ${JSON.stringify(allowlist)}
    const lanIps = /(^(127|10)\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$)|(^192\\.168\\.\\d{1,3}\\.\\d{1,3}$)|(^172\\.1[6-9]\\.\\d{1,3}\\.\\d{1,3}$)|(^172\\.2[0-9]\\.\\d{1,3}\.\\d{1,3}$)|(^172\\.3[0-1]\\.\\d{1,3}\\.\\d{1,3}$)/
    const allowlist = [
      '*://api-staging.windscribe.com/*',
      '*://api.windscribe.com/*',
      '*://assets.windscribe.com/*',
      '*://*.staticnetcontent.com/*',
      '*://api.totallyacdn.com/*',
      '*://assets.totallyacdn.com/*',
      'https://windscribe.com/installed/*',
      ${
        workingApi !== '.windscribe.com' && workingApi !== 'totallyacdn.com'
          ? `'*://api.${workingApi}/*', 
          '*://assets.${workingApi}/*',`
          : ''
      }
    ].concat(userAllowlist)

    const shouldNotProxy = [
      // if it is NOT an allowed protocol then go direct
      // TODO: how to test local protocols?
      ['http', 'ftp', 'ws'].every(protocol => !url.startsWith(protocol)),
      isPlainHostName(host),
      lanIps.test(host),
      allowlist.some(pattern =>  shExpMatch(url, pattern)),
    ].some(_ => _)

    if (shouldNotProxy) {
      alert('Should not proxy')
      return 'DIRECT'
    }

    ${cruiseControlList ? stringifyCruiseControlList(cruiseControlList, proxyPort) : ''}


    alert('${getProxyList(hosts, proxyPort)}')

    return '${getProxyList(hosts, proxyPort)}'
  }
`
}

const stringifyCruiseControlList = (
  cruiseControlList: CruiseControlItem[],
  proxyPort: ProxyPort,
): string => {
  return cruiseControlList
    .map(
      location =>
        `if ([${location.domains
          .map(domain => [`'*://${domain}/*'`, `'*.${domain}/*'`])
          .flat()}].some(d => shExpMatch(url, d))) {
      return '${location.hosts.map(host => `HTTPS ${host.hostname}:${proxyPort}`).join('; ')}'
    }`,
    )
    .join('\n')
}

export const connect = async (
  getState: GetState,
  dispatch: AppDispatch,
  hosts?: Host[],
  silent = false,
): Promise<void> => {
  try {
    if (getState().proxy.status === 'disconnecting') throw Error('Disconnecting')

    // if not disconnecting and there is no internet abort early
    if (!getState().isOnline) {
      pushToDebugLog({
        message: 'No internet connection, aborting',
      })
      return
    }

    dispatch(setStatus(silent ? 'on' : 'connecting'))

    const traffic_max = getState().session?.sessionData?.traffic_max
    const traffic_used = getState().session?.sessionData?.traffic_used
    const is_premium = getState().session?.sessionData?.is_premium
    const sessionStatus = getState().session?.sessionData?.status

    if (traffic_max === undefined || traffic_used === undefined) {
      throw Error('No session info.')
    }

    if (
      (!is_premium && traffic_max !== ACCOUNT_PLAN.UNLIMITED && traffic_max - traffic_used <= 0) ||
      sessionStatus === ACCOUNT_STATES.EXPIRED
    ) {
      dispatch(addOverlay('noData'))
      throw Error('Out of data.')
    }

    const proxySetting = await new Promise(resolve => {
      chrome.proxy.settings.get({}, function (details) {
        resolve(details.levelOfControl)
      })
    })

    if (proxySetting === 'controlled_by_other_extensions') {
      dispatch(addOverlay('extensionConflict'))
      throw Error('Proxy is controlled by another extension.')
    }

    if (!hosts || hosts?.length === 0) {
      throw Error('Error while trying to connect to proxy. No hostname was provided.')
    }

    const allowlist = reduceAllowlist(getState())
    const proxyPort = getState().proxyPort
    const autopilotSelected = getState().autopilot.autopilotSelected
    const cruiseControlList = autopilotSelected ? getState().autopilot.cruiseControlList : undefined
    const workingApi = getState().workingApi

    const config = {
      mode: 'pac_script',
      pacScript: {
        data: createFindProxyForURLFunction(
          hosts,
          allowlist,
          proxyPort,
          cruiseControlList,
          workingApi,
        ),
        mandatory: true,
      },
    }

    if (getState().proxy.status === 'disconnecting') throw Error('Disconnecting')

    if (!getState().isOnline) {
      pushToDebugLog({
        message: 'No internet connection, aborting - before pac_script is set',
      })
      throw Error('No internet connection')
    }
    chrome.proxy.settings.set({ value: config, scope: 'regular' })
    await pushToDebugLog({
      data: {
        hosts,
        allowlist,
        proxyPort,
        cruiseControlList,
        workingApi,
      },
      message: 'pac_script config',
    })

    dispatch(setProxy(hosts))

    if (getState().proxy.status === 'disconnecting') throw Error('Disconnecting')
    if (!getState().isOnline) {
      pushToDebugLog({
        message: 'No internet connection, aborting - before ip is checked',
      })
      throw Error('No internet connection')
    }
    const ip = await checkIp()

    dispatch(setCurrentIp({ currentIp: ip, isOnline: getState().isOnline }))
    if (ip === NO_IP && getState().isOnline) {
      await handleProxyError(getState, dispatch)
    } else {
      dispatch(setReconnectionAttempts(0))
      if (getState().proxy.status === 'disconnecting') throw Error('Disconnecting')
      if (!getState().isOnline) {
        pushToDebugLog({
          message: 'No internet connection, aborting - before proxy is on',
        })
        throw Error('No internet connection')
      }

      dispatch(setStatus('on'))
      await setConnectedThisSession()

      if (getState().allowSystemNotifications && !silent) {
        const autopilotSelected = getState().autopilot.autopilotSelected
        const { city = '', nick = '' } = getState().currentDataCenter
        const { currentLanguage } = getState().currentLanguage
        const locationInfo = autopilotSelected
          ? getLocalizedMessage('wsext_autopilot', currentLanguage)
          : `${city} ${nick}`
        createNotification({
          iconUrl: proxyOnIcon,
          message: getLocalizedMessage('wsext_notification_connected', currentLanguage, { locationInfo }),
        })
      }
    }

    const proxyStatus = getState().proxy.status
    const isAutoPilot = getState().autopilot.autopilotSelected
    const currentLocationId = getState().currentLocation.id
    const allowList = getState().allowlist
    const excludeMatchesFromAllowList = transformAllowListToExcludeMatches(allowList)
    const isLanguageWarpActive = getState().languageWarpEnabled
    const currentDataCenter = getState().currentDataCenter
    const currentDataCenterId = currentDataCenter.id
    const isLocationWarpActive = getState().locationWarp
    const isTimeZoneWarpActive = getState().timeWarpEnabled
    const isUserPro = getState().session.sessionData?.is_premium
    const serverList = getState().servers.serverList

    if (
      proxyStatus === 'on' &&
      !isAutoPilot &&
      currentLocationId !== undefined &&
      currentLocationId !== null
    ) {
      if (isLanguageWarpActive) {
        await unregisterScript(languageWarpScriptId)

        await registerScript(
          languageWarpScriptId,
          [
            SHA256(currentLocationId.toString()) +
              getBundleNamePostFix('languageWarpScript') +
              '.bundle.js',
          ],
          excludeMatchesFromAllowList,
        )
      }
    } else if (isAutoPilot) {
      await unregisterScript(languageWarpScriptId)
    }

    if (
      proxyStatus === 'on' &&
      !isAutoPilot &&
      currentDataCenterId !== undefined &&
      currentDataCenterId !== null
    ) {
      if (isLocationWarpActive) {
        await unregisterScript(locationWarpScriptId)

        const bundleFileName =
          SHA256(currentDataCenterId.toString()) +
          getBundleNamePostFix('locationWarpScript') +
          '.bundle.js'

        const bundleExists = await doesBundleExistInBuild(bundleFileName)

        if (bundleExists) {
          await registerScript(locationWarpScriptId, [bundleFileName], excludeMatchesFromAllowList)
        } else {
          const possibleNearestDataCenterId = await getNearestValidDataCenter(
            currentDataCenterId,
            serverList,
            currentDataCenter,
            isUserPro,
            'locationWarpScript',
          )

          if (possibleNearestDataCenterId !== undefined && possibleNearestDataCenterId !== null) {
            const bundleFileName =
              SHA256(possibleNearestDataCenterId.toString()) +
              getBundleNamePostFix('locationWarpScript') +
              '.bundle.js'

            await registerScript(
              locationWarpScriptId,
              [bundleFileName],
              excludeMatchesFromAllowList,
            )
          } else {
            pushToDebugLog({
              message: 'Could not find any fallback data center',
              tag: 'popup',
              level: 'ERROR',
            })
          }
        }
      }
    } else if (isAutoPilot) {
      await unregisterScript(locationWarpScriptId)
    }

    if (
      proxyStatus === 'on' &&
      !isAutoPilot &&
      currentLocationId !== undefined &&
      currentLocationId !== null
    ) {
      if (isTimeZoneWarpActive) {
        await unregisterScript(timeZoneWarpScriptId)

        await registerScript(
          timeZoneWarpScriptId,
          [
            SHA256(currentLocationId.toString()) +
              getBundleNamePostFix('timeZoneWarpScript') +
              '.bundle.js',
          ],
          excludeMatchesFromAllowList,
        )
      }
    } else if (isAutoPilot) {
      await unregisterScript(timeZoneWarpScriptId)
    }
  } catch (err) {
    disconnect(getState, dispatch)
    dispatch(setStatus('off'))

    pushToDebugLog({
      message: 'Error while trying to connect from proxy.',
      level: 'ERROR',
      data: serializeError(err),
    })
  }
}

export const disconnect = async (
  getState: GetState,
  dispatch: AppDispatch,
  showNotification = true,
): Promise<void> => {
  await clearConnectedThisSession()
  dispatch(setStatus('disconnecting'))

  const config = {
    mode: 'direct',
    rules: {},
  }

  chrome.proxy.settings.set({ value: config, scope: 'regular' })

  // set status to off early, no need to wait for check ip call
  dispatch(setStatus('off'))

  // shuffle hosts for greater ip diversity if hosts are not null
  // shuffle non autopilot hosts
  const hosts = shuffle(getState().currentDataCenter?.hosts)
  if (
    hosts &&
    hosts.length > 0 &&
    getState().currentDataCenter &&
    !getState().autopilot.autopilotSelected
  ) {
    const currentDataCenter = getState().currentDataCenter
    const updatedDataCenter = {
      ...currentDataCenter,
      hosts,
    }
    dispatch(setCurrentDataCenter(updatedDataCenter as DataCenter))
  }

  const ip = await checkIp()

  dispatch(setCurrentIp({ currentIp: ip, isOnline: getState().isOnline }))

  const noData = getState().overlay.templates.includes('noData')

  if (showNotification && getState().allowSystemNotifications && !noData) {
    const { currentLanguage } = getState().currentLanguage
    createNotification({
      iconUrl: proxyOffIcon,
      message: getLocalizedMessage('wsext_notification_disconnected', currentLanguage),
    })
  }

  const proxyStatus = getState().proxy.status

  if (proxyStatus === 'off') {
    // dependent on non autopilot location
    await unregisterScript(languageWarpScriptId)
    await unregisterScript(locationWarpScriptId)
    await unregisterScript(timeZoneWarpScriptId)
  }
}

export const connectToAutopilot = async (
  getState: GetState,
  dispatch: AppDispatch,
  silent = false,
): Promise<void> => {
  try {
    if (getState().proxy.status === 'disconnecting') throw Error('Disconnecting')

    // if not disconnecting and there is no internet abort early
    if (!getState().isOnline) {
      pushToDebugLog({
        message: 'No internet connection, aborting',
      })
      return
    }

    dispatch(setStatus('connecting'))

    await dispatch(applyBestLocationAsAutopilot())

    const location = getState().autopilot.autopilotData?.location
    const dataCenter = getState().autopilot.autopilotData?.dataCenter
    if (!location || !dataCenter) throw new Error('No autopilot candidates are available')
    dispatch(setAutopilotSelected(true))

    dispatch(setCurrentLocation(location))
    dispatch(setCurrentDataCenter(dataCenter))

    // shuffle hosts for ip diversity
    const hosts = shuffle(getState().currentDataCenter?.hosts)

    if (!hosts) throw new Error(`No data center is being used as current`)
    await connect(getState, dispatch, hosts, silent)
  } catch (err) {
    disconnect(getState, dispatch)
    dispatch(setStatus('off'))

    pushToDebugLog({
      message: 'Error while trying to connect from proxy.',
      level: 'ERROR',
      data: serializeError(err),
    })
  }
}

export const handleProxyError = async (
  getState: GetState,
  dispatch: AppDispatch,
): Promise<void> => {
  const RECONNECTION_ATTEMPTS_LIMIT = 2

  if (getState().proxy.status === 'off' || getState().proxy.status === 'disconnecting') {
    pushToDebugLog({
      message: 'proxy is off or disconnecting, ignoring reconnection attemps',
    })
    return
  }

  const failover = getState().connection.failover
  const reconnectionAttempts = getState().proxy.reconnectionAttempts

  if (reconnectionAttempts < RECONNECTION_ATTEMPTS_LIMIT) {
    dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
    const currentHosts = getState().currentDataCenter?.hosts
    if (currentHosts) {
      pushToDebugLog({
        message: 'Failover: retrying current data center',
        tag: 'background',
        level: 'INFO',
        data: JSON.stringify({
          attempt: reconnectionAttempts + 1,
          limit: RECONNECTION_ATTEMPTS_LIMIT,
          dataCenterId: getState().currentDataCenter?.id,
          city: getState().currentDataCenter?.city,
          nick: getState().currentDataCenter?.nick,
        }),
      })
      await connect(getState, dispatch, currentHosts, true)
      return
    }
  }
  if (reconnectionAttempts === RECONNECTION_ATTEMPTS_LIMIT) {
    if (failover === 'Auto / Best') {
      pushToDebugLog({
        message: 'Failover: Auto / Best - delegating to connectToAutopilot',
        tag: 'background',
        level: 'INFO',
      })
      dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
      await connectToAutopilot(getState, dispatch, true)
      return
    }
    if (failover === 'Same Country') {
      const currentLocation = getState().currentLocation
      const currentDataCenter = getState().currentDataCenter
      const isUserPro = getState().session.sessionData?.is_premium

      const newDatacenter = currentLocation.groups?.find(
        dataCenter =>
          dataCenter.id !== currentDataCenter.id && (isUserPro ? true : !dataCenter.pro),
      )

      if (newDatacenter) {
        pushToDebugLog({
          message: 'Failover: Same Country - switching to candidate data center',
          tag: 'background',
          level: 'INFO',
          data: JSON.stringify({
            isUserPro,
            from: {
              id: currentDataCenter.id,
              city: currentDataCenter.city,
              nick: currentDataCenter.nick,
              pro: currentDataCenter.pro,
            },
            to: {
              id: newDatacenter.id,
              city: newDatacenter.city,
              nick: newDatacenter.nick,
              pro: newDatacenter.pro,
            },
          }),
        })
        dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
        dispatch(setCurrentDataCenter(newDatacenter))
        await connect(getState, dispatch, newDatacenter.hosts, true)
        return
      }

      // No eligible data center in the current location (e.g. free user where
      // every other DC in currentLocation.groups is pro). Fall back to
      // Auto / Best before smokewall so the user gets the best globally
      // available node that respects their plan, instead of being stranded
      // on a broken connection.
      pushToDebugLog({
        message:
          'Failover: Same Country found no eligible data center, falling back to Auto / Best',
        tag: 'background',
        level: 'WARN',
        data: JSON.stringify({
          isUserPro,
          locationId: currentLocation.id,
          currentDataCenterId: currentDataCenter.id,
          groupCount: currentLocation.groups?.length ?? 0,
        }),
      })
      dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
      await connectToAutopilot(getState, dispatch, true)
      return
    }
  }

  const smokeWall = getState().connection.smokeWall

  if (smokeWall) {
    dispatch(setConnectionError('Smoke Wall Failover'))
    dispatch(setStatus('on'))
    await setConnectedThisSession()
  } else if (!smokeWall) {
    await disconnect(getState, dispatch)
    dispatch(addOverlay('somethingWeird'))
  }
  return
}
