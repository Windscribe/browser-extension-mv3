;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'th-TH',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['th-TH'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'th-TH'
    return res
  }

  console.log('th-TH')
})()
