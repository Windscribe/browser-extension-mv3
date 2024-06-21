;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'id-ID',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['id-ID'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'id-ID'
    return res
  }

  console.log('id-ID')
})()
