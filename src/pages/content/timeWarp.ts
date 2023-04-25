import type { TimeWarp } from 'utils/types'

export default function (this: Window, { offset, defaultOffset, desiredTimezone }: TimeWarp): void {
  if (!this.OriginalDateConstructor) {
    this.OriginalDateConstructor = Date
  }

  Date = (function (OriginalDateConstructor: DateConstructor) {
    function Date(...args: ConstructorParameters<DateConstructor>) {
      // Typescript complains on this check
      // because it thinks that new Date() can not be called without a parameters
      // due to the inaccurate built-in DateConstructor interface
      // @ts-ignore:next-line
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

    Date.now = function () {
      return new OriginalDateConstructor().getTime() + (defaultOffset - offset) * 60 * 1000
    }
    Date.UTC = OriginalDateConstructor.UTC
    Date.parse = OriginalDateConstructor.parse

    return Date as unknown as DateConstructor
  })(this.OriginalDateConstructor)

  const resolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions
  Intl.DateTimeFormat.prototype.resolvedOptions = function (...args) {
    const res = resolvedOptions.apply(this, args)
    res.timeZone = desiredTimezone
    return res
  }
}
