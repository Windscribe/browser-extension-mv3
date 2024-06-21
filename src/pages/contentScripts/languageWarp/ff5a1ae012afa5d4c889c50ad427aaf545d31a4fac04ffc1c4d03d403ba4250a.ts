;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'cs-CZ',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['cs-CZ'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'cs-CZ'
    return res
  }
})()
