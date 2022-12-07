// TODO consider to move this file to services/browserApi

import { Host } from 'api/types'

// get array of hosts if exists (used for fallbacks)
const getProxyList = (hosts: Host[]) => {
  if (hosts?.length > 0) {
    return hosts.reduce((proxyList: string, host: Host) => {
      //convert each into proxy list format
      proxyList += `HTTPS ${host.hostname}:443;`
      return proxyList
    }, '')
  } else {
    return null
  }
}

const createFindProxyForURLFunction = (hosts: Host[], whitelist: string[]) => {
  const pac = `
  function FindProxyForURL (url, host) {
    function shouldNotProxy(url, host, userWhitelist) {
      let lanIps = /(^(127|10)\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$)|(^192\\.168\\.\\d{1,3}\\.\\d{1,3}$)|(^172\\.1[6-9]\\.\\d{1,3}\\.\\d{1,3}$)|(^172\\.2[0-9]\\.\\d{1,3}\.\\d{1,3}$)|(^172\\.3[0-1]\\.\\d{1,3}\\.\\d{1,3}$)/

      let whitelist = [
        '*://api.windscribe.com/*',
        '*://assets.windscribe.com/*',
        '*://*.staticnetcontent.com/*',
        '*://api.totallyacdn.com/*',
        '*://assets.totallyacdn.com/*',
        'https://windscribe.com/installed/*',
      ].concat(userWhitelist)

      return [
        isPlainHostName(host),
        // if it is NOT an allowed protocol then go direct
        // TODO: how to test local protocols?
        ['http', 'ftp', 'ws'].every(protocol => !url.startsWith(protocol)),
        lanIps.test(host),
        whitelist.some(pattern => shExpMatch(url, pattern)),
      ].some(_ => _)
    }
    let whitelist = ${JSON.stringify(whitelist)}
    if (shouldNotProxy(url, host, whitelist)) {
      return 'DIRECT'
    }
    return '${getProxyList(hosts)}'
  }
`
  return pac
}

export const connect = async (hosts: Host[], whitelist: string[]): Promise<void> => {
  const config = {
    mode: 'pac_script',
    pacScript: {
      data: createFindProxyForURLFunction(hosts, whitelist),
    },
  }
  return chrome.proxy.settings.set({ value: config, scope: 'regular' }, function () {})
}

export const disconnect = async (): Promise<void> => {
  const config = {
    mode: 'direct',
    rules: {},
  }
  return chrome.proxy.settings.set({ value: config, scope: 'regular' })
}
