;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'bs-BA',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['bs-BA'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'bs-BA'
    return res
  }

  console.log('bs-BA')
})()
