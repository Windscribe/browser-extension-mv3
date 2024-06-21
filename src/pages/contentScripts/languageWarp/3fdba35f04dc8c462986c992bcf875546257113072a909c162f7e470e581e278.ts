;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'nl-NL',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['nl-NL'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'nl-NL'
    return res
  }
})()
