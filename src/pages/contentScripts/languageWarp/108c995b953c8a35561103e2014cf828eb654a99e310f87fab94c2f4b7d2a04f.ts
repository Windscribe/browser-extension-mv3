;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'en-US',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['en-US'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'en-US'
    return res
  }

  console.log('en-US')
})()
