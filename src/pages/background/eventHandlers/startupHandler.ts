import getErrorMessage from 'utils/getErrorMessage'
import { type StoreType } from 'state/store'
import {
  connectProxy,
  disconnectProxy,
  connectToAutopilot,
  handleConnectionError,
} from 'state/slices/proxy'

export function startupHandler(bgStore: Promise<StoreType>) {
  return async (): Promise<void> => {
    let store
    try {
      store = await bgStore

      if (!store.getState().connection.autoConnect) {
        store.dispatch(disconnectProxy())
        return
      }

      const authHash = store.getState().session.session_auth_hash
      if (!authHash) {
        store.dispatch(handleConnectionError('No session auth hash is available'))
        return
      }

      const currentHosts = store.getState().currentDataCenter?.hosts
      const autopilotSelected = store.getState().autopilot.autopilotSelected
      if (!autopilotSelected && currentHosts) {
        await store.dispatch(connectProxy(currentHosts))
        return
      }

      await store.dispatch(connectToAutopilot())
    } catch (err) {
      const message = getErrorMessage(err)
      store?.dispatch(handleConnectionError(message))
    }
  }
}
