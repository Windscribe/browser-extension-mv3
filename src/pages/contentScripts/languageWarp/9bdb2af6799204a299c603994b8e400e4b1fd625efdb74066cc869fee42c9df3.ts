;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'ka-GE',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['ka-GE'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'ka-GE'
    return res
  }
})()
