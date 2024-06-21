;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'en-IE',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['en-IE'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'en-IE'
    return res
  }

  console.log('en-IE')
})()
