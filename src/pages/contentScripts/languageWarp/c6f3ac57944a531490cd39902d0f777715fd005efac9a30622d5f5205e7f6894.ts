;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'de-CH',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['de-CH'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'de-CH'
    return res
  }

  console.log('de-CH')
})()
