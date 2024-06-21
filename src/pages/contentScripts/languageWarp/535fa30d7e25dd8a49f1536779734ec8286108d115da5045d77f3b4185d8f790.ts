;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'zh-HK',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['zh-HK'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'zh-HK'
    return res
  }
})()
