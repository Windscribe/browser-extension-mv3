;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'en-PH',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['en-PH'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'en-PH'
    return res
  }

  console.log('en-PH')
})()
