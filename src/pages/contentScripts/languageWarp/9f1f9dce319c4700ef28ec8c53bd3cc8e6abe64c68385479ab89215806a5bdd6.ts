;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'km-KH',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['km-KH'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'km-KH'
    return res
  }
})()
