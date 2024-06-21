;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'ak-GH',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['ak-GH'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'ak-GH'
    return res
  }

  console.log('ak-GH')
})()
