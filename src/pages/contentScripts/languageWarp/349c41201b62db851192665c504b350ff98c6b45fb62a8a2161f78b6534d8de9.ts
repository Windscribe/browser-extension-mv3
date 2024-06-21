;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'ms-MY',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['ms-MY'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'ms-MY'
    return res
  }
})()
