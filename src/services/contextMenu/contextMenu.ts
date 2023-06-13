const MENU_ITEM_ID = 'view-debug-log'

export function addContextMenuItem(): void {
  chrome.contextMenus.create({
    id: MENU_ITEM_ID,
    title: 'View Debug Log',
    contexts: ['all'],
  })
}

export function removeContextMenuItem(): void {
  chrome.contextMenus.remove(MENU_ITEM_ID)
}
