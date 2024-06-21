;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'es-AR',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['es-AR'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'es-AR'
    return res
  }
})()
