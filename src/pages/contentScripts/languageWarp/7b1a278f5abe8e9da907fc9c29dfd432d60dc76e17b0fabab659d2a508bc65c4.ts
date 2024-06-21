;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'es-CO',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['es-CO'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'es-CO'
    return res
  }
})()
