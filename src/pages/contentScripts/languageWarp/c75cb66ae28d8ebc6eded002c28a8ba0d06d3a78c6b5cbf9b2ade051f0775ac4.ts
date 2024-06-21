;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'de-AT',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['de-AT'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'de-AT'
    return res
  }
})()
