import { Host } from 'api/types'
import type { ProxyPort } from 'utils/types'

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
  whitelist: string[],
  proxyPort: ProxyPort,
) => {
  return `
  function FindProxyForURL (url, host) {
    const userWhitelist = ${JSON.stringify(whitelist)}
    const lanIps = /(^(127|10)\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$)|(^192\\.168\\.\\d{1,3}\\.\\d{1,3}$)|(^172\\.1[6-9]\\.\\d{1,3}\\.\\d{1,3}$)|(^172\\.2[0-9]\\.\\d{1,3}\.\\d{1,3}$)|(^172\\.3[0-1]\\.\\d{1,3}\\.\\d{1,3}$)/
    const whitelist = [
      '*://checkip.windscribe.com/*',
      '*://api-staging.windscribe.com/*',
      '*://api.windscribe.com/*',
      '*://assets.windscribe.com/*',
      '*://*.staticnetcontent.com/*',
      '*://api.totallyacdn.com/*',
      '*://assets.totallyacdn.com/*',
      'https://windscribe.com/installed/*',
    ].concat(userWhitelist)

    const shouldNotProxy = [
      // if it is NOT an allowed protocol then go direct
      // TODO: how to test local protocols?
      ['http', 'ftp', 'ws'].every(protocol => !url.startsWith(protocol)),
      isPlainHostName(host),
      lanIps.test(host),
      whitelist.some(pattern =>  shExpMatch(url, pattern)),
    ].some(_ => _)

    if (shouldNotProxy) {
      return 'DIRECT'
    }

    return '${getProxyList(hosts, proxyPort)}'
  }
`
}

export const connect = async (
  hosts: Host[],
  whitelist: string[],
  proxyPort: ProxyPort,
): Promise<void> => {
  const config = {
    mode: 'pac_script',
    pacScript: {
      data: createFindProxyForURLFunction(hosts, whitelist, proxyPort),
      mandatory: true,
    },
  }

  throw Error('Fake Fake Fake')

  return chrome.proxy.settings.set({ value: config, scope: 'regular' })
}

export const disconnect = async (): Promise<void> => {
  const config = {
    mode: 'direct',
    rules: {},
  }
  return chrome.proxy.settings.set({ value: config, scope: 'regular' })
}
