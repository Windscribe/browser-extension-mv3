;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'et-EE',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['et-EE'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'et-EE'
    return res
  }
})()
