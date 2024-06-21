;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'hr-HR',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['hr-HR'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'hr-HR'
    return res
  }

  console.log('hr-HR')
})()
