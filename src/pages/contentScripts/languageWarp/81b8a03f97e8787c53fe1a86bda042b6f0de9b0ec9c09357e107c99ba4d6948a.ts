;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'da-DK',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['da-DK'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'da-DK'
    return res
  }
})()
