;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'en-KE',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['en-KE'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'en-KE'
    return res
  }

  console.log('en-KE')
})()
