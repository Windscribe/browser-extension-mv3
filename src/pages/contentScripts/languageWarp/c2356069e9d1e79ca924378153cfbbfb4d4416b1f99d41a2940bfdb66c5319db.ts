;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'sv-SE',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['sv-SE'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'sv-SE'
    return res
  }
})()
