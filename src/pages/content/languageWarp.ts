export default function languageWarp(locale: string): void {
  Object.defineProperty(window.navigator, 'language', {
    value: locale,
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: [locale],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = locale
    return res
  }
}
