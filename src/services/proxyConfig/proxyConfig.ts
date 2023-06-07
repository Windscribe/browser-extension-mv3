import { CruiseControlItem } from 'api/types'
import type { ProxyPort } from 'utils/types'
import { reduceAllowlist } from 'utils/reduceAllowlist'
import { type StoreType } from 'state/store'
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
import { ACCOUNT_PLAN } from 'utils/constants'
import { applyBestLocationAsAutopilot, setAutopilotSelected } from 'state/slices/autopilot'
import { setCurrentLocation } from 'state/slices/currentLocation'
import { setCurrentDataCenter } from 'state/slices/currentDataCenter'

import proxyOffIcon from 'assets/img/proxyOff.png'
import proxyOnIcon from 'assets/img/proxyOn.png'
import { pushToDebugLog } from 'state/slices/debugLog'

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

export const connect = async (store: StoreType, hosts: Host[]): Promise<void> => {
  try {
    if (store.getState().proxy.status === 'disconnecting') throw Error('Disconnecting')
    store.dispatch(setStatus('connecting'))

    const { traffic_max, traffic_used, is_premium } = store.getState().session

    if (traffic_max === undefined || traffic_used === undefined) {
      throw Error('No session info.')
    }

    if (!is_premium && traffic_max !== ACCOUNT_PLAN.UNLIMITED && traffic_max - traffic_used <= 0) {
      store.dispatch(addOverlay('noData'))
      throw Error('Out of data.')
    }

    const proxySetting = await new Promise(resolve => {
      chrome.proxy.settings.get({}, function (details) {
        resolve(details.levelOfControl)
      })
    })

    if (proxySetting === 'controlled_by_other_extensions') {
      store.dispatch(addOverlay('extensionConflict'))
      throw Error('Proxy is controlled by another extension.')
    }

    if (!hosts || hosts?.length === 0) {
      throw Error('Error while trying to connect to proxy. No hostname was provided.')
    }
    const allowlist = reduceAllowlist(store.getState())
    const proxyPort = store.getState().proxyPort
    const autopilotSelected = store.getState().autopilot.autopilotSelected
    const cruiseControlList = autopilotSelected
      ? store.getState().autopilot.cruiseControlList
      : undefined
    const config = {
      mode: 'pac_script',
      pacScript: {
        data: createFindProxyForURLFunction(hosts, allowlist, proxyPort, cruiseControlList),
        mandatory: true,
      },
    }

    if (store.getState().proxy.status === 'disconnecting') throw Error('Disconnecting')
    chrome.proxy.settings.set({ value: config, scope: 'regular' })

    store.dispatch(setProxy(hosts))

    if (store.getState().proxy.status === 'disconnecting') throw Error('Disconnecting')
    const ip = await checkIp(store.getState().workingApi)

    store.dispatch(setCurrentIp(ip))
    if (ip === '---.---.---.---') {
      await handleProxyError(store)
    } else {
      store.dispatch(setReconnectionAttempts(0))
      if (store.getState().proxy.status === 'disconnecting') throw Error('Disconnecting')
      store.dispatch(setStatus('on'))

      if (store.getState().allowSystemNotifications) {
        const autopilotSelected = store.getState().autopilot.autopilotSelected
        const { city = '', nick = '' } = store.getState().currentDataCenter
        const locationInfo = autopilotSelected ? 'Autopilot' : `${city} ${nick}`
        createNotification({
          iconUrl: proxyOnIcon,
          message: `You are now connected to Windscribe (${locationInfo})`,
        })
      }
    }
  } catch (err) {
    disconnect(store)
    store.dispatch(setStatus('off'))

    store.dispatch(
      pushToDebugLog({
        message: 'Error while trying to connect from proxy.',
        level: 'ERROR',
        data: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      }),
    )
  }
}

export const disconnect = async (store: StoreType): Promise<void> => {
  store.dispatch(setStatus('disconnecting'))

  const config = {
    mode: 'direct',
    rules: {},
  }

  chrome.proxy.settings.set({ value: config, scope: 'regular' })

  const workingApi = store.getState().workingApi

  const ip = await checkIp(workingApi)

  store.dispatch(setCurrentIp(ip))

  store.dispatch(setStatus('off'))

  if (store.getState().allowSystemNotifications) {
    createNotification({
      iconUrl: proxyOffIcon,
      message: 'Connection to Windscribe has been terminated',
    })
  }
}

export const connectToAutopilot = async (store: StoreType): Promise<void> => {
  try {
    if (store.getState().proxy.status === 'disconnecting') throw Error('Disconnecting')
    store.dispatch(setStatus('connecting'))

    await store.dispatch(applyBestLocationAsAutopilot())

    const location = store.getState().autopilot.autopilotData?.location
    const dataCenter = store.getState().autopilot.autopilotData?.dataCenter
    if (!location || !dataCenter) throw new Error('No autopilot candidates are available')
    store.dispatch(setAutopilotSelected(true))

    store.dispatch(setCurrentLocation(location))
    store.dispatch(setCurrentDataCenter(dataCenter))

    const hosts = store.getState().currentDataCenter?.hosts
    if (!hosts) throw new Error(`No data center is being used as current`)
    await connect(store, hosts)
  } catch (err) {
    disconnect(store)
    store.dispatch(setStatus('off'))

    store.dispatch(
      pushToDebugLog({
        message: 'Error while trying to connect from proxy.',
        level: 'ERROR',
        data: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      }),
    )
  }
}

export const handleProxyError = async (store: StoreType): Promise<void> => {
  const RECONNECTION_ATTEMPTS_LIMIT = 2

  const failover = store.getState().connection.failover
  const reconnectionAttempts = store.getState().proxy.reconnectionAttempts

  if (reconnectionAttempts < RECONNECTION_ATTEMPTS_LIMIT) {
    store.dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
    const currentHosts = store.getState().currentDataCenter?.hosts
    if (currentHosts) {
      await connect(store, currentHosts)
      return
    }
  }
  if (reconnectionAttempts === RECONNECTION_ATTEMPTS_LIMIT) {
    if (failover === 'Auto / Best') {
      store.dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
      await connectToAutopilot(store)
      return
    }
    if (failover === 'Same Country') {
      const currentLocation = store.getState().currentLocation
      const currentDataCenter = store.getState().currentDataCenter

      const newDatacenter = currentLocation.groups?.find(
        dataCenter => dataCenter.id !== currentDataCenter.id,
      )

      if (newDatacenter) {
        store.dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
        store.dispatch(setCurrentDataCenter(newDatacenter))
        await connect(store, newDatacenter.hosts)
        return
      }
    }
  }

  const smokeWall = store.getState().connection.smokeWall

  if (smokeWall) {
    store.dispatch(setConnectionError('Smoke Wall Failover'))
    store.dispatch(setStatus('on'))
  } else if (!smokeWall) {
    await disconnect(store)
    store.dispatch(addOverlay('somethingWeird'))
  }
  return
}
