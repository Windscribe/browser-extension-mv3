;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'ro-RO',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['ro-RO'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'ro-RO'
    return res
  }

  console.log('ro-RO')
})()
