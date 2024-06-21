;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'mk-MK',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['mk-MK'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'mk-MK'
    return res
  }
})()
