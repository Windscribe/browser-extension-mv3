import { pushToDebugLog } from 'services/debugLog'
import { getLocalizedMessage, type SupportedLocales } from 'utils/getLocalisedString'

const MENU_ITEM_ID = 'view-debug-log'

const getDebugLogContextMenuTitle = (currentLanguage?: SupportedLocales) =>
  `${getLocalizedMessage('wsext_view', currentLanguage)} ${getLocalizedMessage('wsext_debug_log',
    currentLanguage,
  )}`

export function addContextMenuItem(currentLanguage?: SupportedLocales): void {
  chrome.contextMenus.create(
    {
      id: MENU_ITEM_ID,
      title: getDebugLogContextMenuTitle(currentLanguage),
      contexts: ['all'],
    },
    onCreated,
  )
}

export function updateContextMenuItem(currentLanguage?: SupportedLocales): void {
  chrome.contextMenus.update(
    MENU_ITEM_ID,
    {
      title: getDebugLogContextMenuTitle(currentLanguage),
    },
    () => {
      // Ignore missing menu errors; the menu can be disabled by user settings.
      void chrome.runtime.lastError
    },
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
