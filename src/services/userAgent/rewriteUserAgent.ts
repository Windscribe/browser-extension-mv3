const disallowedProtocols = ['chrome-extension:', 'chrome:', 'about:', 'moz-extension:']

export default async function rewriteUserAgent(
  tabOrId: chrome.tabs.Tab | number,
  spoofedUserAgent?: string,
): Promise<void> {
  if (!tabOrId || !spoofedUserAgent || typeof spoofedUserAgent !== 'string') return

  let tab: chrome.tabs.Tab | undefined = undefined

  if (typeof tabOrId == 'number') {
    const tabs = await chrome.tabs.query({ windowType: 'normal' })
    tab = tabs.find(tab => tab.id === tabOrId)
  } else {
    tab = tabOrId
  }

  if (!tab?.url || !tab?.id) return

  const { protocol } = new URL(tab?.url)
  if (disallowedProtocols.includes(protocol)) return

  chrome.scripting.executeScript({
    target: { tabId: tab.id, allFrames: true },
    world: 'MAIN',
    func: function (spoofedUserAgent) {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: spoofedUserAgent,
        configurable: true,
      })
      Object.defineProperty(window.navigator, 'appVersion', {
        value: spoofedUserAgent,
        configurable: true,
      })
      Object.defineProperty(window.navigator, 'userAgentData', {
        value: undefined,
        configurable: true,
      })
    },
    args: [spoofedUserAgent],
  })
}

let handleOnCreated: (tab: chrome.tabs.Tab) => void
let handleOnActivated: (activeInfo: { tabId: number; windowId: number }) => void
let handleOnUpdated: (tabId: number, changeInfo: object, tab: chrome.tabs.Tab) => void

export function addTabEventsHandler(spoofedUserAgent: string): void {
  try {
    handleOnCreated = tab => rewriteUserAgent(tab, spoofedUserAgent)
    handleOnActivated = ({ tabId }) => rewriteUserAgent(tabId, spoofedUserAgent)
    handleOnUpdated = (_, __, tab) => rewriteUserAgent(tab, spoofedUserAgent)

    addListenerIfNotAdded('onCreated', handleOnCreated)
    addListenerIfNotAdded('onActivated', handleOnActivated)
    addListenerIfNotAdded('onUpdated', handleOnUpdated)
  } catch (err) {
    throw Error('Error while trying to add tabs events listeners.', { cause: err as Error })
  }
}

export function removeTabEventsHandler(): void {
  try {
    chrome.tabs.onCreated.removeListener(handleOnCreated)
    chrome.tabs.onActivated.removeListener(handleOnActivated)
    chrome.tabs.onUpdated.removeListener(handleOnUpdated)
  } catch (err) {
    throw Error('Error while trying to remove tabs events listeners.', { cause: err as Error })
  }
}

type TabEvent = 'onCreated' | 'onActivated' | 'onUpdated'

function addListenerIfNotAdded(event: TabEvent, listener: (...arg: any[]) => void): void {
  if (chrome.tabs[event].hasListener(listener)) return
  chrome.tabs[event].addListener(listener)
}
