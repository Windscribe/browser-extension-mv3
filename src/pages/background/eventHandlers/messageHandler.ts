import { type StoreType } from 'state/store'
import { setBlockLists } from 'state/slices/blocker'
import { connect, disconnect, connectToAutopilot } from 'services/proxyConfig'
import { setIsOnline } from 'state/slices/isOnline'
import { CHECK_CURRENT_IP, setReconnectionAttempts } from 'state/slices/proxy'
import { NETWORK_CHANGE_EVENT_DELAY_MS } from 'utils/constants'

export function messageHandler(bgStore: Promise<StoreType>) {
  // Message is typed as any here: https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  return async (message: any): Promise<void> => {
    const store = await bgStore
    if (message.what === 'applyRulesets' && message.from !== 'popup') {
      store.dispatch(setBlockLists(message.enabledRulesets))
    } else if (message.what === 'connectProxy') {
      await connect(store.getState, store.dispatch, message.hosts)
    } else if (message.what === 'disconnectProxy') {
      await disconnect(store.getState, store.dispatch)
    } else if (message.what === 'connectAutopilot') {
      await connectToAutopilot(store.getState, store.dispatch)
    } else if (message.what === 'networkChangeEvent') {
      const isOnline = navigator.onLine
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
  }
}
