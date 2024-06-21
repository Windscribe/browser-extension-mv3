;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'el-GR',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['el-GR'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'el-GR'
    return res
  }

  console.log('el-GR')
})()
