import { pushToDebugLog } from 'services/debugLog'
import { BROWSING_DATA } from 'utils/constants'

const CLEARABLE_PROTOCOLS = new Set(['http:', 'https:'])

const SITE_DATA_TYPES: chrome.browsingData.DataTypeSet = {
  cacheStorage: true,
  cookies: true,
  fileSystems: true,
  indexedDB: true,
  localStorage: true,
  serviceWorkers: true,
  webSQL: true,
}

const removeOriginData = (origin: string): void => {
  chrome.browsingData.remove({ origins: [origin] }, SITE_DATA_TYPES, () => {
    const message = chrome.runtime.lastError?.message
    if (!message) return

    void pushToDebugLog({
      message: 'Failed to clear current page data',
      tag: 'popup',
      level: 'ERROR',
      data: message,
    })
  })
}

export const getClearableOrigin = (rawUrl: string | undefined): string | null => {
  if (!rawUrl) return null

  let url: URL
  try {
    url = new URL(rawUrl)
  } catch {
    return null
  }

  if (!CLEARABLE_PROTOCOLS.has(url.protocol)) return null
  return url.origin
}

export const clearCurrentSiteData = async (): Promise<void> => {
  const granted = await chrome.permissions.contains({
    permissions: [BROWSING_DATA],
  })
  if (!granted) {
    throw new Error('browsingData permission is not granted')
  }

  const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
  const tab = tabs[0]
  const origin = getClearableOrigin(tab?.url)
  if (!tab?.id || !origin) {
    throw new Error('Current tab cannot be cleared')
  }

  removeOriginData(origin)

  void chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      world: 'MAIN',
      func: () => {
        window.sessionStorage.clear()
      },
    })
    .then(() => chrome.tabs.reload(tab.id as number, { bypassCache: true }))
    .catch(error => {
      void pushToDebugLog({
        message: 'Failed to reset the current page after clearing storage',
        tag: 'popup',
        level: 'WARN',
        data: error instanceof Error ? error.message : String(error),
      })
    })
}
