;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'es-PA',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['es-PA'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'es-PA'
    return res
  }
})()
