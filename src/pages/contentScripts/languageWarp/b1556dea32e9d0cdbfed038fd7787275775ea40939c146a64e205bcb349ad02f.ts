;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'es-PE',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['es-PE'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'es-PE'
    return res
  }

  console.log('es-PE')
})()
