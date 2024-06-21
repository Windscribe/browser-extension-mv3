;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'zh-SG',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['zh-SG'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'zh-SG'
    return res
  }
})()
