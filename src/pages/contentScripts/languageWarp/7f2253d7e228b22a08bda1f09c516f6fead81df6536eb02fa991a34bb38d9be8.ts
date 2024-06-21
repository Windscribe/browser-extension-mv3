;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'hu-HU',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['hu-HU'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'hu-HU'
    return res
  }

  console.log('hu-HU')
})()
