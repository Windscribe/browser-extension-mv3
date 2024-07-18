import { pushToDebugLog } from 'services/debugLog'
import { type StoreType } from 'state/store'

export function authRequiredHandler(bgStore: Promise<StoreType>) {
  return async (
    details: chrome.webRequest.WebAuthenticationChallengeDetails,
    callback?: (response: chrome.webRequest.BlockingResponse) => void,
  ): Promise<void> => {
    if (!callback) return

    const store = await bgStore

    const { username, password } = store.getState().serverCredentials

    if (!username || !password || details.statusCode !== 407) {
      callback({})
    } else {
      await pushToDebugLog({
        message: 'onAuthRequired handler run',
        data: JSON.stringify({
          username,
          details,
        }),
      })
      callback({
        authCredentials: { username: atob(username), password: atob(password) },
      })
    }
  }
}
