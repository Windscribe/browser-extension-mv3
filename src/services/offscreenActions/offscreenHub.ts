import { CombinedAllowlistItem, Message } from 'api/types'
import { setTheme } from './migrateTheme/migrateTheme'
import { sendApplyRulesSetMessageToUblock } from './migrateBlockerSettings/migrateBlockerSettings'
import { sendFilteringModeMessagesToUblock } from './migrateAllowlist/migrateAllowlist'

// maintain one offscreen document to avoid single document restriction when you need to send and receive multiple messages
// at the start create a single off screen doc
// make different handlers for everything
// no more coordination would be needed

chrome.runtime.onMessage.addListener(handleMessages)

const worker = new Worker('./checkIp.worker.js')

async function sendMessageToWorker(worker: Worker, message: string) {
  return new Promise((resolve, reject) => {
    function handleMessage(event: MessageEvent<string>) {
      resolve(event.data)
      worker.removeEventListener('message', handleMessage)
    }

    function handleError(error: ErrorEvent) {
      reject(error)
      worker.removeEventListener('error', handleError)
    }

    worker.addEventListener('message', handleMessage)
    worker.addEventListener('error', handleError)

    worker.postMessage(message)
  })
}

function handleMessages(
  message: Message,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (response: any) => void,
) {
  // Return early if this message isn't meant for the offscreen script
  if (message.target !== 'offscreen') {
    return true
  }

  switch (message.type) {
    case 'migrateTheme':
      // Important:
      // Reason for return true and using then's
      // https://stackoverflow.com/a/53024910
      // https://issuetracker.google.com/issues/314359857?pli=1

      setTheme().then(logs => {
        sendResponse({
          logs,
        })
      })

      //TODO handle catch conditions here
      break

    case 'migrateBlockerSettings':
    case 'applyBlockerSettings':
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
        return true
      }

      const rulesSets = message.data as string[]

      sendApplyRulesSetMessageToUblock(rulesSets).then(logs => {
        sendResponse({
          logs,
        })
      })

      break

    case 'migrateAllowlist':
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
        return true
      }

      const collection = message.data as (CombinedAllowlistItem | undefined)[]

      sendFilteringModeMessagesToUblock(collection).then(logs => {
        sendResponse({
          logs,
        })
      })

      break

    case 'fireNoSSLRequest':
      // send message to worker and wait for it
      sendMessageToWorker(worker, 'nossl_call').then(res => sendResponse({ res }))

      break

    default:
      console.warn(`Unexpected message type received: '${message.type}'.`)
  }

  // needed to keep the channel open
  return true
}
