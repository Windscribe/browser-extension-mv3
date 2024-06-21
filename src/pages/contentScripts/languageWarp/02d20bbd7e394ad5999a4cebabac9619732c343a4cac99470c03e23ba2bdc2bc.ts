;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'it-IT',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['it-IT'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'it-IT'
    return res
  }

  console.log('it-IT')
})()
