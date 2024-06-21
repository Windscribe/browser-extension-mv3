;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'ja-JP',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['ja-JP'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'ja-JP'
    return res
  }

  console.log('ja-JP')
})()
