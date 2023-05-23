import { type StoreType } from 'state/store'
import { setBlockLists } from 'state/slices/blocker'

export function messageHandler(bgStore: Promise<StoreType>) {
  // Message is typed as any here: https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  return async (message: any): Promise<void> => {
    if (message.what === 'applyRulesets' && message.from !== 'popup') {
      const store = await bgStore
      store.dispatch(setBlockLists(message.enabledRulesets))
    }
  }
}
