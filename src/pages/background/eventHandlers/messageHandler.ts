import { type StoreType } from 'state/store'
import { setBlockLists } from 'state/slices/blocker'
import { connect, disconnect, connectToAutopilot } from 'services/proxyConfig'

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
    }
  }
}
