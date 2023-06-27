import { CruiseControlItem } from 'api/types'
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
import { ACCOUNT_STATES, ACCOUNT_PLAN } from 'utils/constants'
import { applyBestLocationAsAutopilot, setAutopilotSelected } from 'state/slices/autopilot'
import { setCurrentLocation } from 'state/slices/currentLocation'
import { setCurrentDataCenter } from 'state/slices/currentDataCenter'

import proxyOffIcon from 'assets/img/proxyOff.png'
import proxyOnIcon from 'assets/img/proxyOn.png'
import { pushToDebugLog } from 'services/debugLog'

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
      return 'DIRECT'
    }

    ${cruiseControlList ? stringifyCruiseControlList(cruiseControlList, proxyPort) : ''}

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
  hosts: Host[],
): Promise<void> => {
  try {
    if (getState().proxy.status === 'disconnecting') throw Error('Disconnecting')
    dispatch(setStatus('connecting'))

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
    chrome.proxy.settings.set({ value: config, scope: 'regular' })

    dispatch(setProxy(hosts))

    if (getState().proxy.status === 'disconnecting') throw Error('Disconnecting')
    const ip = await checkIp(getState().workingApi)

    dispatch(setCurrentIp(ip))
    if (ip === '---.---.---.---') {
      await handleProxyError(getState, dispatch)
    } else {
      dispatch(setReconnectionAttempts(0))
      if (getState().proxy.status === 'disconnecting') throw Error('Disconnecting')
      dispatch(setStatus('on'))

      if (getState().allowSystemNotifications) {
        const autopilotSelected = getState().autopilot.autopilotSelected
        const { city = '', nick = '' } = getState().currentDataCenter
        const locationInfo = autopilotSelected ? 'Autopilot' : `${city} ${nick}`
        createNotification({
          iconUrl: proxyOnIcon,
          message: `You are now connected to Windscribe (${locationInfo})`,
        })
      }
    }
  } catch (err) {
    disconnect(getState, dispatch)
    dispatch(setStatus('off'))

    pushToDebugLog({
      message: 'Error while trying to connect from proxy.',
      level: 'ERROR',
      data: JSON.stringify(err, Object.getOwnPropertyNames(err)),
    })
  }
}

export const disconnect = async (getState: GetState, dispatch: AppDispatch): Promise<void> => {
  dispatch(setStatus('disconnecting'))

  const config = {
    mode: 'direct',
    rules: {},
  }

  chrome.proxy.settings.set({ value: config, scope: 'regular' })

  const workingApi = getState().workingApi

  const ip = await checkIp(workingApi)

  dispatch(setCurrentIp(ip))

  dispatch(setStatus('off'))

  if (getState().allowSystemNotifications) {
    createNotification({
      iconUrl: proxyOffIcon,
      message: 'Connection to Windscribe has been terminated',
    })
  }
}

export const connectToAutopilot = async (
  getState: GetState,
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    if (getState().proxy.status === 'disconnecting') throw Error('Disconnecting')
    dispatch(setStatus('connecting'))

    await dispatch(applyBestLocationAsAutopilot())

    const location = getState().autopilot.autopilotData?.location
    const dataCenter = getState().autopilot.autopilotData?.dataCenter
    if (!location || !dataCenter) throw new Error('No autopilot candidates are available')
    dispatch(setAutopilotSelected(true))

    dispatch(setCurrentLocation(location))
    dispatch(setCurrentDataCenter(dataCenter))

    const hosts = getState().currentDataCenter?.hosts
    if (!hosts) throw new Error(`No data center is being used as current`)
    await connect(getState, dispatch, hosts)
  } catch (err) {
    disconnect(getState, dispatch)
    dispatch(setStatus('off'))

    pushToDebugLog({
      message: 'Error while trying to connect from proxy.',
      level: 'ERROR',
      data: JSON.stringify(err, Object.getOwnPropertyNames(err)),
    })
  }
}

export const handleProxyError = async (
  getState: GetState,
  dispatch: AppDispatch,
): Promise<void> => {
  const RECONNECTION_ATTEMPTS_LIMIT = 2

  const failover = getState().connection.failover
  const reconnectionAttempts = getState().proxy.reconnectionAttempts

  if (reconnectionAttempts < RECONNECTION_ATTEMPTS_LIMIT) {
    dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
    const currentHosts = getState().currentDataCenter?.hosts
    if (currentHosts) {
      await connect(getState, dispatch, currentHosts)
      return
    }
  }
  if (reconnectionAttempts === RECONNECTION_ATTEMPTS_LIMIT) {
    if (failover === 'Auto / Best') {
      dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
      await connectToAutopilot(getState, dispatch)
      return
    }
    if (failover === 'Same Country') {
      const currentLocation = getState().currentLocation
      const currentDataCenter = getState().currentDataCenter

      const newDatacenter = currentLocation.groups?.find(
        dataCenter => dataCenter.id !== currentDataCenter.id,
      )

      if (newDatacenter) {
        dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
        dispatch(setCurrentDataCenter(newDatacenter))
        await connect(getState, dispatch, newDatacenter.hosts)
        return
      }
    }
  }

  const smokeWall = getState().connection.smokeWall

  if (smokeWall) {
    dispatch(setConnectionError('Smoke Wall Failover'))
    dispatch(setStatus('on'))
  } else if (!smokeWall) {
    await disconnect(getState, dispatch)
    dispatch(addOverlay('somethingWeird'))
  }
  return
}
