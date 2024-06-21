;(() => {
  Object.defineProperty(window.navigator, 'language', {
    value: 'lv-LV',
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: ['lv-LV'],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = 'lv-LV'
    return res
  }
})()
