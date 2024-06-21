;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'uk-UA',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['uk-UA'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'uk-UA'
    return res
  }
})()
