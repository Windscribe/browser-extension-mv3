;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'is-IS',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['is-IS'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'is-IS'
    return res
  }

  console.log('is-IS')
})()
