// TODO consider to move this file to services/browserApi
export const connect = async (host: string, bypassList: string[]): Promise<void> => {
  const config: chrome.proxy.ProxyConfig = {
    mode: 'fixed_servers',
    rules: {
      singleProxy: {
        scheme: 'https',
        host,
      },
      bypassList,
    },
  }
  return await chrome.proxy.settings.set({ value: config, scope: 'regular' })
}

export const disconnect = async (): Promise<void> => {
  const config = {
    mode: 'direct',
    rules: {},
  }
  return await chrome.proxy.settings.set({ value: config, scope: 'regular' })
}
