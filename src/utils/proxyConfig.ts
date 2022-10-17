// TODO COnsider to move this file to services/browserApi
export const connect = async (host: string): Promise<void> => {
  const config = {
    mode: 'fixed_servers',
    rules: {
      singleProxy: {
        scheme: 'https',
        host: host.includes('us-central') ? 'dassadsda.com' : host,
      },
      //   bypassList: ['foobar.com'],
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
