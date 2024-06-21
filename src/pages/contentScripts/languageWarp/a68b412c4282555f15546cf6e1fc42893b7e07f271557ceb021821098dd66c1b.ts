;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'pt-BR',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['pt-BR'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'pt-BR'
    return res
  }
})()
