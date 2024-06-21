;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'sk-SK',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['sk-SK'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'sk-SK'
    return res
  }
})()
