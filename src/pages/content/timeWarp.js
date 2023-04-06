//import type { Mutable, TimeWarp } from 'utils/types'

export default function ({ offset, defaultOffset, dst, desiredTimezone }) {
  if (!this.OriginalDateConstructor) {
    this.OriginalDateConstructor = Date
  }

  Date = (function (OriginalDateConstructor) {
    function Date(...args) {
      if (args.length === 0) {
        const spoofedMilliseconds =
          new OriginalDateConstructor().getTime() + (defaultOffset - offset) * 60 * 1000
        return new OriginalDateConstructor(spoofedMilliseconds)
      }
      return new OriginalDateConstructor(...args)
    }

    const propertyDescriptors = Object.getOwnPropertyDescriptors(OriginalDateConstructor)
    Object.defineProperties(Date, propertyDescriptors)

    Date.prototype.getTimezoneOffset = function () {
      return offset
    }

    return Date
  })(this.OriginalDateConstructor)

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions
  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.timeZone = desiredTimezone
    return res
  }
}
