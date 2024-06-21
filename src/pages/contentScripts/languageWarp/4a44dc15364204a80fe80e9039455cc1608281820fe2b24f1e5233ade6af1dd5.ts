;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'en-GB',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['en-GB'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'en-GB'
    return res
  }
})()
