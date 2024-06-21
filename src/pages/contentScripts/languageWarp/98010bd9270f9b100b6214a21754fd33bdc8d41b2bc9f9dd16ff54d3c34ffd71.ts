;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'nb-NO',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['nb-NO'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'nb-NO'
    return res
  }
})()
