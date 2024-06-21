;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'es-MX',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['es-MX'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'es-MX'
    return res
  }
})()
