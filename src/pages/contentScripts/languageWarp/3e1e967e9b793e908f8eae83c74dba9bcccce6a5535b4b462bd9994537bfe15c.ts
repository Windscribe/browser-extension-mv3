;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'ko-KR',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['ko-KR'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'ko-KR'
    return res
  }
})()
