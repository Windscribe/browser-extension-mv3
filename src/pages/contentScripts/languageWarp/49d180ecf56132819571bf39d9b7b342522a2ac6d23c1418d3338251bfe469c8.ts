;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'en-NZ',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['en-NZ'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'en-NZ'
    return res
  }
})()
