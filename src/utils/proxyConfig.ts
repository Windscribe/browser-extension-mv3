export const connectProxy = (host: string): void => {
  const config = {
    mode: 'fixed_servers',
    rules: {
      singleProxy: {
        scheme: 'https',
        host,
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
