import getErrorMessage from 'utils/getErrorMessage'
import { type StoreType } from 'state/store'
import { handleConnectionError } from 'state/slices/proxy'
import { connect, disconnect, connectToAutopilot } from 'services/proxyConfig'

export function startupHandler(bgStore: Promise<StoreType>) {
  return async (): Promise<void> => {
    let store
    try {
      store = await bgStore

      if (!store.getState().connection.autoConnect) {
        await disconnect(store.getState, store.dispatch)
        return
      }

      const authHash = store.getState().session.sessionData?.session_auth_hash
      if (!authHash) {
        store.dispatch(handleConnectionError('No session auth hash is available'))
        return
      }

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
