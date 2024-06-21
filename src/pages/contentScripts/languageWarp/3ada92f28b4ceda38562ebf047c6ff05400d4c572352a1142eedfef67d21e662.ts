;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'en-ZA',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['en-ZA'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'en-ZA'
    return res
  }

  console.log('en-ZA')
})()
