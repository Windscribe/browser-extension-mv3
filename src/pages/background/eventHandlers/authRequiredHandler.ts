import { type StoreType } from 'state/store'

export function authRequiredHandler(bgStore: Promise<StoreType>) {
  return async (
    details: chrome.webRequest.WebAuthenticationChallengeDetails,
    callback?: (response: chrome.webRequest.BlockingResponse) => void,
  ): Promise<void> => {
    const store = await bgStore

    const { username, password } = store.getState().serverCredentials
    if (!username || !password) return

    callback &&
      callback({
        authCredentials: { username: atob(username), password: atob(password) },
      })
  }
}
