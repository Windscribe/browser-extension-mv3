;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'zh-TW',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['zh-TW'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'zh-TW'
    return res
  }
})()
