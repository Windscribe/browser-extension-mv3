;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'pl-PL',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['pl-PL'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'pl-PL'
    return res
  }
})()
