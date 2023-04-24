import { DateTime } from 'luxon'

import timezoneOffsets from './timezoneOffsets'
import type { TimeWarp } from './types'

type TimezoneName = keyof typeof timezoneOffsets

function analyze(timezone: TimezoneName): { offset: number; dst: string } {
  const offset = DateTime.local().setZone(timezone).offset
  const country = timezone.split('/')[1].replace(/[-_]/g, ' ')

  let timezoneOffsetItem = timezoneOffsets[timezone]

  // Assign default values if any property is missing
  timezoneOffsetItem ??= { offset: undefined, msg: undefined }
  timezoneOffsetItem.offset ??= offset
  timezoneOffsetItem.msg ??= {
    standard: `${country} Standard Time`,
    daylight: `${country} Daylight Time`,
  }
  timezoneOffsetItem.msg.standard ??= `${country} Standard Time`
  timezoneOffsetItem.msg.daylight ??= `${country} Daylight Time`

  const dst =
    // Determine if the current location is using day light savings time or not.
    offset !== timezoneOffsetItem.offset
      ? timezoneOffsetItem.msg.daylight
      : timezoneOffsetItem.msg.standard

  return {
    offset,
    dst,
  }
}

export default function (currentLocationTimezone?: string): TimeWarp | undefined {
  if (!currentLocationTimezone) return

  const { offset, dst } = analyze(currentLocationTimezone as TimezoneName)

  return {
    desiredTimezone: currentLocationTimezone,
    offset: -1 * offset,
    defaultOffset: new Date().getTimezoneOffset(),
    dst,
  }
}
