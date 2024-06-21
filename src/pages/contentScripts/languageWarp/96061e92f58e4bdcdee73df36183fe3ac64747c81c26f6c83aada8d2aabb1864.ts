;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'fi-FI',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['fi-FI'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'fi-FI'
    return res
  }
})()
