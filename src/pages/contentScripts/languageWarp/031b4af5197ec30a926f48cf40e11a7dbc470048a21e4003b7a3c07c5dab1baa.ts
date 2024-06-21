;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'es-ES',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['es-ES'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'es-ES'
    return res
  }
})()
