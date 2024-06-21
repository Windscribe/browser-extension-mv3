;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'ar-AE',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['ar-AE'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'ar-AE'
    return res
  }

  console.log('ar-AE')
})()
