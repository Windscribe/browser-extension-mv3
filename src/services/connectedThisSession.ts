const CONNECTED_THIS_SESSION = 'connectedThisSession'

export const setConnectedThisSession = (): Promise<void> =>
  chrome.storage.session.set({ [CONNECTED_THIS_SESSION]: true })

export const clearConnectedThisSession = (): Promise<void> =>
  chrome.storage.session.remove(CONNECTED_THIS_SESSION)

export const getConnectedThisSession = async (): Promise<boolean> => {
  const stored = await chrome.storage.session.get(CONNECTED_THIS_SESSION)
  return stored[CONNECTED_THIS_SESSION] === true
}
