;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'tr-TR',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['tr-TR'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'tr-TR'
    return res
  }

  console.log('tr-TR')
})()
