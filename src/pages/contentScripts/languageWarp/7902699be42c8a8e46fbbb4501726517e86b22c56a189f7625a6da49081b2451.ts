;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'en-CA',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['en-CA'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'en-CA'
    return res
  }
})()
