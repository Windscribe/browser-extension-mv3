;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'el-CY',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['el-CY'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'el-CY'
    return res
  }
})()
