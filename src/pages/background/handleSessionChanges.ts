import { setSession, logout } from 'state/slices/session'
import { getSessionStatus } from 'api/endpoints'
import { setOverlay } from 'state/slices/overlay'
import { ACCOUNT_STATES, ACCOUNT_PLAN } from 'utils/constants'
import { type StoreType } from 'state/store'

const handleSessionChanges = async (store: StoreType): Promise<void> => {
  const { isConnected } = store.getState().proxy
  const workingApi = store.getState().workingApi
  const currentSession = store.getState().session

  // poll only when connected and we have a session_auth_hash
  if (isConnected && currentSession?.session_auth_hash) {
    const updatedSession = await getSessionStatus(currentSession?.session_auth_hash, workingApi)

    if (updatedSession.data) {
      if (updatedSession.data.status === ACCOUNT_STATES.BANNED) {
        await store.dispatch(logout())
        store.dispatch(setOverlay({ isOpen: true, template: 'banned' }))
      }

      if (
        currentSession.is_premium === ACCOUNT_PLAN.PREMIUM &&
        updatedSession.data.is_premium === ACCOUNT_PLAN.FREE
      ) {
        store.dispatch(setOverlay({ isOpen: true, template: 'proPlanExpired' }))
      }

      store.dispatch(setSession(updatedSession.data))
    }
  }
}

export default handleSessionChanges
