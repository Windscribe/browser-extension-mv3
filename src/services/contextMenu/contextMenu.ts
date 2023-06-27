import { pushToDebugLog } from 'services/debugLog'

const MENU_ITEM_ID = 'view-debug-log'

export function addContextMenuItem(): void {
  chrome.contextMenus.create(
    {
      id: MENU_ITEM_ID,
      title: 'View Debug Log',
      contexts: ['all'],
    },
    onCreated,
  )
}

const onCreated = () => {
  const lastError = chrome.runtime.lastError
  if (lastError) {
    pushToDebugLog({
      level: 'ERROR',
      tag: 'background',
      message: 'Error while creating context menu item',
      data: JSON.stringify(lastError),
    })
  }
}

export function removeContextMenuItem(): void {
  chrome.contextMenus.remove(MENU_ITEM_ID)
}
