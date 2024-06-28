import { LogItemResponse, Message } from 'api/types'
import sendMessage from 'services/runtime/sendMessage'
import getErrorMessage from 'utils/getErrorMessage'
import { LogItem } from 'utils/types'

chrome.runtime.onMessage.addListener(handleMessages)

async function sendApplyRulesSetMessageToUblock(rulesSets: string[]) {
  const logs: LogItem[] = []

  logs.push({
    level: 'INFO',
    message: 'Sending rulesSets to ublock',
    data: rulesSets,
    tag: 'offscreen',
  })

  try {
    await sendMessage({
      what: 'applyRulesets',
      from: 'popup',
      enabledRulesets: rulesSets,
    })

    logs.push({
      level: 'INFO',
      message: `Applied Rulesets`,
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
  message: Message<string[]>,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: LogItemResponse) => void,
) {
  // Return early if this message isn't meant for the offscreen script
  if (message.target !== 'offscreen') {
    return
  }

  switch (message.type) {
    case 'migrateBlockerSettings':
      // Important:
      // Reason for return true and using then's
      // https://stackoverflow.com/a/53024910
      // https://issuetracker.google.com/issues/314359857?pli=1

      if (!message.data) {
        sendResponse({
          logs: [
            {
              level: 'ERROR',
              message: 'Rulesets are undefined',
              tag: 'offscreen',
              data: message.data,
            },
          ],
        })
        return
      }

      const rulesSets = message.data

      sendApplyRulesSetMessageToUblock(rulesSets).then(logs => {
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
