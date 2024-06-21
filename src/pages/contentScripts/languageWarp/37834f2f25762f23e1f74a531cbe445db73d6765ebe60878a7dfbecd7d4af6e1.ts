;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'sq-AL',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['sq-AL'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'sq-AL'
    return res
  }
})()
