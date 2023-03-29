import type { Mutable, TimeWarp } from 'utils/types'

export default function ({ offset, defaultOffset, dst, desiredTimezone }: TimeWarp): void {
  const DateClone = Date // or copy
  // if (!(window as any).ODate) {
  //   ;(window as any).ODate = Date
  // }

  console.log('%c args  ', 'background: #383E49; color: #1ADEAE', {
    offset,
    defaultOffset,
    dst,
    desiredTimezone,
  })

  const {
    getTime,
    getDate,
    getDay,
    getFullYear,
    getHours,
    getMilliseconds,
    getMinutes,
    getMonth,
    getSeconds,
    toDateString,
    toLocaleString,
    toString,
    toTimeString,
    toLocaleTimeString,
    toLocaleDateString,
    setHours,
    setTime,
    setFullYear,
    setMilliseconds,
    setMinutes,
    setMonth,
    setSeconds,
    setDate,
    setUTCDate,
    setUTCFullYear,
    setUTCHours,
    setUTCMilliseconds,
    setUTCMinutes,
    setUTCMonth,
    setUTCSeconds,
  } = DateClone.prototype

  class ShiftedDate extends DateClone {
    nd: Date
    constructor(...args: ConstructorParameters<DateConstructor>) {
      super(...args)
      this.nd = new DateClone(getTime.apply(this) + (defaultOffset - offset) * 60 * 1000)
    }

    // get
    toLocaleString(...args: Parameters<Date['toLocaleString']>) {
      return toLocaleString.apply(this.nd, args)
    }
    toLocaleTimeString(...args: Parameters<Date['toLocaleTimeString']>) {
      return toLocaleTimeString.apply(this.nd, args)
    }
    toLocaleDateString(...args: Parameters<Date['toLocaleDateString']>) {
      return toLocaleDateString.apply(this.nd, args)
    }
    toDateString(...args: Parameters<Date['toDateString']>) {
      return toDateString.apply(this.nd, args)
    }
    getDate(...args: Parameters<Date['getDate']>) {
      return getDate.apply(this.nd, args)
    }
    getDay(...args: Parameters<Date['getDay']>) {
      return getDay.apply(this.nd, args)
    }
    getFullYear(...args: Parameters<Date['getFullYear']>) {
      return getFullYear.apply(this.nd, args)
    }
    getHours(...args: Parameters<Date['getHours']>) {
      return getHours.apply(this.nd, args)
    }
    getMilliseconds(...args: Parameters<Date['getMilliseconds']>) {
      return getMilliseconds.apply(this.nd, args)
    }
    getMinutes(...args: Parameters<Date['getMinutes']>) {
      return getMinutes.apply(this.nd, args)
    }
    getMonth(...args: Parameters<Date['getMonth']>) {
      return getMonth.apply(this.nd, args)
    }
    getSeconds(...args: Parameters<Date['getSeconds']>) {
      return getSeconds.apply(this.nd, args)
    }
    // set
    setHours(...args: Parameters<Date['setHours']>) {
      const a = getTime.call(this.nd)
      const b = setHours.apply(this.nd, args)
      setTime.call(this, getTime.call(this) + b - a)
      return b
    }
    setFullYear(...args: Parameters<Date['setFullYear']>) {
      const a = getTime.call(this.nd)
      const b = setFullYear.apply(this.nd, args)
      setTime.call(this, getTime.call(this) + b - a)
      return b
    }
    setMilliseconds(...args: Parameters<Date['setMilliseconds']>) {
      const a = getTime.call(this.nd)
      const b = setMilliseconds.apply(this.nd, args)
      setTime.call(this, getTime.call(this) + b - a)
      return b
    }
    setMinutes(...args: Parameters<Date['setMinutes']>) {
      const a = getTime.call(this.nd)
      const b = setMinutes.apply(this.nd, args)
      setTime.call(this, getTime.call(this) + b - a)
      return b
    }
    setMonth(...args: Parameters<Date['setMonth']>) {
      const a = getTime.call(this.nd)
      const b = setMonth.apply(this.nd, args)
      setTime.call(this, getTime.call(this) + b - a)
      return b
    }
    setSeconds(...args: Parameters<Date['setSeconds']>) {
      const a = getTime.call(this.nd)
      const b = setSeconds.apply(this.nd, args)
      setTime.call(this, getTime.call(this) + b - a)
      return b
    }
    setDate(...args: Parameters<Date['setDate']>) {
      const a = getTime.call(this.nd)
      const b = setDate.apply(this.nd, args)
      setTime.call(this, getTime.call(this) + b - a)
      return b
    }
    setTime(...args: Parameters<Date['setTime']>) {
      const a = getTime.call(this)
      const b = setTime.apply(this, args)
      setTime.call(this.nd, getTime.call(this.nd) + b - a)
      return b
    }
    setUTCDate(...args: Parameters<Date['setUTCDate']>) {
      const a = getTime.call(this)
      const b = setUTCDate.apply(this, args)
      setTime.call(this.nd, getTime.call(this.nd) + b - a)
      return b
    }
    setUTCFullYear(...args: Parameters<Date['setUTCFullYear']>) {
      const a = getTime.call(this)
      const b = setUTCFullYear.apply(this, args)
      setTime.call(this.nd, getTime.call(this.nd) + b - a)
      return b
    }
    setUTCHours(...args: Parameters<Date['setUTCHours']>) {
      const a = getTime.call(this)
      const b = setUTCHours.apply(this, args)
      setTime.call(this.nd, getTime.call(this.nd) + b - a)
      return b
    }
    setUTCMilliseconds(...args: Parameters<Date['setUTCMilliseconds']>) {
      const a = getTime.call(this)
      const b = setUTCMilliseconds.apply(this, args)
      setTime.call(this.nd, getTime.call(this.nd) + b - a)
      return b
    }
    setUTCMinutes(...args: Parameters<Date['setUTCMinutes']>) {
      const a = getTime.call(this)
      const b = setUTCMinutes.apply(this, args)
      setTime.call(this.nd, getTime.call(this.nd) + b - a)
      return b
    }
    setUTCMonth(...args: Parameters<Date['setUTCMonth']>) {
      const a = getTime.call(this)
      const b = setUTCMonth.apply(this, args)
      setTime.call(this.nd, getTime.call(this.nd) + b - a)
      return b
    }
    setUTCSeconds(...args: Parameters<Date['setUTCSeconds']>) {
      const a = getTime.call(this)
      const b = setUTCSeconds.apply(this, args)
      setTime.call(this.nd, getTime.call(this.nd) + b - a)
      return b
    }
    // toString
    toString(...args: Parameters<Date['toString']>) {
      return clean(toString.apply(this.nd, args))
    }
    toTimeString(...args: Parameters<Date['toTimeString']>) {
      return clean(toTimeString.apply(this.nd, args))
    }
    // offset
    getTimezoneOffset() {
      return offset
    }
    test() {
      console.log('%c I am shifted ', 'background: #383E49; color: #1ADEAE', this.nd)
    }
  }
  ;(Date as any) = ShiftedDate

  const clean = (str: string) => {
    const toGMT = (offset: number) => {
      const z = (n: number) => (n < 10 ? '0' : '') + n
      const sign = offset <= 0 ? '+' : '-'
      offset = Math.abs(offset)
      return sign + z((offset / 60) | 0) + z(offset % 60)
    }
    const GMTIndex = str.indexOf('GMT')
    const currentGMT = str.substring(GMTIndex + 3, GMTIndex + 8)
    str = str.replace(currentGMT, toGMT(offset))
    if (str.indexOf(' (') !== -1) {
      str = str.split(' (')[0] + ' (' + dst + ')'
    }
    return str
  }

  function intlTimezone(timezone: string): void {
    const ODateTimeFormat = Intl.DateTimeFormat

    ;(Intl.DateTimeFormat as any) = function (
      locales?: string | string[] | undefined,
      options = {},
    ) {
      Object.assign(options, {
        timezone,
      })
      return ODateTimeFormat(locales, options)
    }
    ;(Intl.DateTimeFormat.prototype as Mutable<typeof Intl.DateTimeFormat.prototype>) =
      Object.create(ODateTimeFormat.prototype)

    Intl.DateTimeFormat.supportedLocalesOf = ODateTimeFormat.supportedLocalesOf
  }
  if (desiredTimezone) intlTimezone(desiredTimezone)
}
