;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'hi-IN',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['hi-IN'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'hi-IN'
    return res
  }
})()
