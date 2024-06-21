;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'ru-RU',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['ru-RU'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'ru-RU'
    return res
  }

  console.log('ru-RU')
})()
