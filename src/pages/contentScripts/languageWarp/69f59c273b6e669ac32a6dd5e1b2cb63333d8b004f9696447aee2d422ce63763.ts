;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'lt-LT',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['lt-LT'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'lt-LT'
    return res
  }
})()
