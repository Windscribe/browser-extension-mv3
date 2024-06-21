;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'he-IL',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['he-IL'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'he-IL'
    return res
  }

  console.log('he-IL')
})()
