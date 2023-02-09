{
  const userAgent = JSON.parse(spoofedUserAgent)

  Object.defineProperty(window.navigator, 'userAgent', {
    value: userAgent,
    configurable: true,
  })
}
