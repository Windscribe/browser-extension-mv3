;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'fr-FR',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['fr-FR'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'fr-FR'
    return res
  }
})()
