;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'nl-BE',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['nl-BE'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'nl-BE'
    return res
  }
})()
