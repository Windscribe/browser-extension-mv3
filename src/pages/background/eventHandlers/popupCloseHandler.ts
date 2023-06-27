import { type StoreType } from 'state/store'
import { setView } from 'state/slices/view'
import { removeAllOverlays } from 'state/slices/overlay'

export function popupCloseHandler(bgStore: Promise<StoreType>) {
  return async (port: chrome.runtime.Port): Promise<void> => {
    if (port.name === 'popup') {
      port.onDisconnect.addListener(async function () {
        const store = await bgStore

        store.dispatch(removeAllOverlays())

        const sessionLoading = store.getState().session.loading
        const sessionAuthHash = store.getState().session.sessionData?.session_auth_hash
        if (sessionAuthHash && sessionLoading === 'fulfilled') {
          store.dispatch(setView('Home'))
        }
      })
    }
  }
}
