export const connectProxy = (host: string): void => {
  console.log(host)
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
  // TODO: Set 'isConnected' inside proxy.api callback instead of directly in components.
  chrome.proxy.settings.set({ value: config, scope: 'regular' }, function () {})
}

export const disconnectProxy = (): void => {
  const config = {
    mode: 'direct',
    rules: {},
  }
  chrome.proxy.settings.set({ value: config, scope: 'regular' }, function () {})
}
