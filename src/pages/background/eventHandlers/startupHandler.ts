import getErrorMessage from 'utils/getErrorMessage'
import { type StoreType } from 'state/store'
import { handleConnectionError } from 'state/slices/proxy'
import { connect, disconnect, connectToAutopilot } from 'services/proxyConfig'
import { fetchNotifications } from 'state/slices/newsfeed'
import { initializeUserAgentsList } from 'state/slices/userAgent'
import { enableOrDisableUblock } from 'services/detectUblock'
import { setupOffscreenDocument } from 'services/offscreenActions/offscreenController'

export function startupHandler(bgStore: Promise<StoreType>) {
  return async (): Promise<void> => {
    let store
    try {
      store = await bgStore

      await setupOffscreenDocument('offscreenHub.html', [chrome.offscreen.Reason.IFRAME_SCRIPTING])

      if (!store.getState().connection.autoConnect) {
        await disconnect(store.getState, store.dispatch, false)
        return
      }

      const authHash = store.getState().session.sessionData?.session_auth_hash
      if (!authHash) {
        store.dispatch(handleConnectionError('No session auth hash is available'))
        return
      }

      await store.dispatch(fetchNotifications())
      store.dispatch(initializeUserAgentsList())

      enableOrDisableUblock(store.getState().blocker.blockLists, store)

      const currentHosts = store.getState().currentDataCenter?.hosts
      const autopilotSelected = store.getState().autopilot.autopilotSelected
      if (!autopilotSelected && currentHosts) {
        await connect(store.getState, store.dispatch, currentHosts)
        return
      }

      await connectToAutopilot(store.getState, store.dispatch)
    } catch (err) {
      const message = getErrorMessage(err)
      store?.dispatch(handleConnectionError(message))
    }
  }
}
