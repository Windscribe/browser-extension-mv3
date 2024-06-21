;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'pt-PT',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['pt-PT'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'pt-PT'
    return res
  }
})()
