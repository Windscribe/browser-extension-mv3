;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'bg-BG',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['bg-BG'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'bg-BG'
    return res
  }
})()
