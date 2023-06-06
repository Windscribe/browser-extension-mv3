import { type StoreType } from 'state/store'
import { setView } from 'state/slices/view'

export function popupCloseHandler(bgStore: Promise<StoreType>) {
  return async (port: chrome.runtime.Port): Promise<void> => {
    if (port.name === 'popup') {
      port.onDisconnect.addListener(async function () {
        const store = await bgStore
        store.dispatch(setView('Home'))
      })
    }
  }
}
