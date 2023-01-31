export default function (spoofedLocaleCode: string): void {
  Object.defineProperty(window.navigator, 'language', {
    value: spoofedLocaleCode,
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'languages', {
    value: [spoofedLocaleCode],
    configurable: true,
  })

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions

  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.locale = spoofedLocaleCode
    return res
  }
}
