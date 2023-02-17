const getCurrentTabHostname: () => Promise<string> = async () => {
  const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
  const url = tabs[0].url
  if (!url) return 'Could not get tab info'

  const { hostname } = new URL(url)
  return hostname
}
const getCurrentTabId: () => Promise<number | undefined> = async () => {
  const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
  const tabId = tabs[0].id
  return tabId
}

const reloadCurrentTab: () => Promise<void> = async () => {
  const tabId = await getCurrentTabId()
  if (tabId) await chrome.tabs.reload(tabId)
}

export { getCurrentTabHostname, getCurrentTabId, reloadCurrentTab }
