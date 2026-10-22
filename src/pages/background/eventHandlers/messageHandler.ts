import { type StoreType } from 'state/store'
import { setBlockLists } from 'state/slices/blocker'
import { connect, disconnect, connectToAutopilot } from 'services/proxyConfig'
import { setIsOnline } from 'state/slices/isOnline'
import { CHECK_CURRENT_IP } from 'state/slices/proxy'
import { NETWORK_CHANGE_EVENT_DELAY_MS } from 'utils/constants'
import { pushToDebugLog } from 'services/debugLog'

export function messageHandler(bgStore: Promise<StoreType>) {
  // Message is typed as any here: https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  return (message: any, sender: chrome.runtime.MessageSender): boolean => {
    // Don't intercept webext-redux messages - return false SYNCHRONOUSLY
    if (message.type?.startsWith('chromex.')) {
      return false
    }

    // Fire-and-forget async handling for our messages
    bgStore.then(async store => {
      if (message.what === 'applyRulesets' && message.from !== 'popup') {
        store.dispatch(setBlockLists(message.enabledRulesets))
      } else if (message.what === 'connectProxy') {
        await connect(store.getState, store.dispatch, message.hosts)
      } else if (message.what === 'disconnectProxy') {
        await disconnect(store.getState, store.dispatch)
      } else if (message.what === 'connectAutopilot') {
        await connectToAutopilot(store.getState, store.dispatch)
      } else if (message.what === 'fingerprintDetected') {
        // Only accept this from our own content scripts running in a tab.
        // Anything from popup/background/external senders, or without a tab
        // context, is rejected. The URL comes from sender.tab.url (browser-
        // attested) rather than any page-controlled payload to prevent log
        // injection via the fingerprint CustomEvent bridge.
        if (sender.id !== chrome.runtime.id || !sender.tab) return

        const rawUrl = sender.tab.url ?? ''
        const url = rawUrl.length > 150 ? `${rawUrl.slice(0, 150)}…` : rawUrl

        pushToDebugLog({
          message: `Fingerprint.js activity detected at: ${url}`,
          tag: 'contentScript',
        })
      } else if (message.what === 'networkChangeEvent') {
        const isOnline = message.onlineStatus
        pushToDebugLog({ message: `Network change event: ${isOnline}`, tag: 'background' })
        store.dispatch(setIsOnline(isOnline))

        if (isOnline) {
          // when wifi is turned on isOnline turns to true but it takes time for the wifi
          // for the wifi to actually connect so we wait until it is connected
          // this delay is arbitrary with no guarantee there will internet by the time
          // this request is fired
          setTimeout(() => {
            store.dispatch({ type: `alias/${CHECK_CURRENT_IP}` })
          }, NETWORK_CHANGE_EVENT_DELAY_MS)
        }
      }
    })

    return false // We don't need async response for these messages
  }
}
