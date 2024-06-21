;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'en-AU',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['en-AU'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'en-AU'
    return res
  }

  console.log('en-AU')
})()
