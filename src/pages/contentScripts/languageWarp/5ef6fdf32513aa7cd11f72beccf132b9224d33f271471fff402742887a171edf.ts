;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'sr-RS',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['sr-RS'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'sr-RS'
    return res
  }
})()
