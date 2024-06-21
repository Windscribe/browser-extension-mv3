;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'fr-LU',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['fr-LU'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'fr-LU'
    return res
  }
})()
