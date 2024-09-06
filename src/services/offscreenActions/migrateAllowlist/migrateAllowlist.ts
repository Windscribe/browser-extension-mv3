import { CombinedAllowlistItem } from 'api/types'
import { setUblockFilteringMode } from 'services/ublockController/setFilteringMode'
import getErrorMessage from 'utils/getErrorMessage'
import { LogItem } from 'utils/types'

async function sendFilteringModeMessagesToUblock(
  collection: (CombinedAllowlistItem | undefined)[],
): Promise<LogItem[]> {
  const logs: LogItem[] = []

  logs.push({
    level: 'INFO',
    message: 'Sending allowlist items to ublock',
    data: collection,
    tag: 'offscreen',
  })

  try {
    for (const item of collection) {
      if (item?.allowAds === true && item.hostname !== undefined && item.level !== undefined) {
        await setUblockFilteringMode({ hostname: item.hostname, level: item.level })
      }
    }

    logs.push({
      level: 'INFO',
      message: `Set Ublock filtering mode`,
      tag: 'offscreen',
    })
  } catch (err) {
    const message = getErrorMessage(err)
    logs.push({
      level: 'ERROR',
      data: JSON.stringify(err),
      message,
      tag: 'offscreen',
    })
  }

  return logs
}

export { sendFilteringModeMessagesToUblock }
