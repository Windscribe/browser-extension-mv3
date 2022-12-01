const MENU_ITEM_ID = 'view-debug-log'

export function addContextMenuItem(): void {
  chrome.contextMenus.create({
    id: MENU_ITEM_ID,
    title: 'View Debug Log',
    contexts: ['all'],
  })
  chrome.contextMenus.onClicked.addListener(handleMenuItemClick)
}

export function removeContextMenuItem(): void {
  chrome.contextMenus.remove(MENU_ITEM_ID)
}

const handleMenuItemClick: OnClickCallBack = info => {
  if (info.menuItemId === MENU_ITEM_ID) openDebugLogView()
}

async function openDebugLogView() {
  const tabs = await queryDebugLogTab()
  const tabId = tabs?.[0]?.id

  if (!tabId) return chrome.tabs.create({ url: 'debugLog.html' })

  return chrome.tabs.update(tabId, { active: true })
}

async function queryDebugLogTab() {
  const url = chrome.runtime.getURL('debugLog.html')
  return await chrome.tabs.query({ url })
}

type OnClickCallBack = Parameters<typeof chrome.contextMenus.onClicked.addListener>[0]
