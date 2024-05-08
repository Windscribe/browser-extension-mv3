import { CombinedAllowlistItem, LogItemResponse, Message } from 'api/types'
import { setUblockFilteringMode } from 'services/ublockController/setFilteringMode'
import getErrorMessage from 'utils/getErrorMessage'
import { LogItem } from 'utils/types'

chrome.runtime.onMessage.addListener(handleMessages)

async function sendFilteringModeMessagesToUblock(
  collection: (CombinedAllowlistItem | undefined)[],
) {
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

function handleMessages(
  message: Message<(CombinedAllowlistItem | undefined)[]>,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: LogItemResponse) => void,
) {
  // Return early if this message isn't meant for the offscreen script
  if (message.target !== 'offscreen') {
    return
  }

  switch (message.type) {
    case 'migrateAllowlist':
      // Important:
      // Reason for return true and using then's
      // https://stackoverflow.com/a/53024910
      // https://issuetracker.google.com/issues/314359857?pli=1

      if (!message.data) {
        sendResponse({
          logs: [
            {
              level: 'ERROR',
              message: 'Collection is undefined',
              tag: 'offscreen',
              data: message.data,
            },
          ],
        })
        return
      }

      const collection = message.data

      sendFilteringModeMessagesToUblock(collection).then(logs => {
        sendResponse({
          logs,
        })
      })

      break
    default:
      console.warn(`Unexpected message type received: '${message.type}'.`)
  }
  return true
}
