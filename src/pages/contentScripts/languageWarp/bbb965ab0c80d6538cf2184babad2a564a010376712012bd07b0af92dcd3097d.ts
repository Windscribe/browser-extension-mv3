;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'ro-MD',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['ro-MD'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'ro-MD'
    return res
  }

  console.log('ro-MD')
})()
