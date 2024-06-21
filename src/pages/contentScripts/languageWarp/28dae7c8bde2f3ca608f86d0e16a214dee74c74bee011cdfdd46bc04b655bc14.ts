;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'es-EC',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['es-EC'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'es-EC'
    return res
  }
})()
