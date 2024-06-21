;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'de-DE',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['de-DE'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'de-DE'
    return res
  }

  console.log('de-DE')
})()
