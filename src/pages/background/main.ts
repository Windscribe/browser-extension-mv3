import { initializeWrappedStore } from 'state'
import { chooseIcon } from 'state/slices/iconVariant'
import { pushToDebugLog } from 'services/debugLog'
import { checkSessionReconnect } from 'services/sessionReconnectCheck'
import {
  alarmHandler,
  authRequiredHandler,
  onInstalledHandler,
  getInstallReason,
  proxyErrorHandler,
  startupHandler,
  messageHandler,
} from './eventHandlers'
import { fetchNotifications } from 'state/slices/newsfeed'
import { initializeUserAgentsList, setOriginalUserAgent } from 'state/slices/userAgent'
import { ublockStatusChangeHandler } from './eventHandlers/ublockStatusChangeHandler'
import { enableOrDisableUblock } from 'services/detectUblock'
import { setIsOnline } from 'state/slices/isOnline'
import { serializeError } from 'serialize-error'
import { addPermissions } from 'state/slices/permissions'
import {
  handlePermissionsAdded,
  handlePermissionsRemoved,
} from './eventHandlers/permissionsHandler'
import { setCurrentLanguageSelection } from 'state/slices/currentLanguage'
import { handleKeyboardCommand } from 'services/shortcuts/keyboardCommandHandler'
import { updateContextMenuItem } from 'services/contextMenu'

try {
  const bgStore = initializeWrappedStore().then(async store => {
    await checkSessionReconnect(store.getState, store.dispatch, getInstallReason())
    pushToDebugLog({ message: 'Bg store was initialized', tag: 'background' })
    const grantedPermissions = await chrome.permissions.getAll()

    // Only set system language if it's already set to system, to avoid overriding user's custom selection
    if (store.getState().currentLanguage.currentSelection === 'system') {
      // this actually sets the currentLanguge to what ever the system language is
      store.dispatch(setCurrentLanguageSelection('system'))
    }

    store.dispatch(addPermissions(grantedPermissions.permissions ?? []))
    store.dispatch(setIsOnline(navigator.onLine))
    //TODO dispatch it only if it is not in pending state already
    store.dispatch(chooseIcon())

    const sessionAuthHash = store.getState().session.sessionData?.session_auth_hash
    if (sessionAuthHash) {
      store.dispatch(fetchNotifications())
    }

    store.dispatch(initializeUserAgentsList())
    enableOrDisableUblock(store.getState().blocker.blockLists, store)
    store.dispatch(setOriginalUserAgent(navigator.userAgent))

    let previousLanguage = store.getState().currentLanguage.currentLanguage
    let previousContextMenu = store.getState().contextMenu
    if (previousContextMenu) {
      updateContextMenuItem(previousLanguage)
    }

    store.subscribe(() => {
      const state = store.getState()
      const currentLanguage = state.currentLanguage.currentLanguage
      const currentContextMenu = state.contextMenu
      const shouldUpdateContextMenu =
        currentContextMenu &&
        (currentLanguage !== previousLanguage || currentContextMenu !== previousContextMenu)

      previousLanguage = currentLanguage
      previousContextMenu = currentContextMenu

      if (shouldUpdateContextMenu) {
        updateContextMenuItem(currentLanguage)
      }
    })

    return store
  })

  chrome.runtime.onInstalled.addListener(onInstalledHandler(bgStore))

  chrome.runtime.onStartup.addListener(startupHandler(bgStore))

  chrome.proxy.onProxyError.addListener(proxyErrorHandler(bgStore))

  chrome.webRequest.onAuthRequired.addListener(
    authRequiredHandler(bgStore),
    { urls: ['<all_urls>'] },
    ['asyncBlocking'],
  )

  chrome.alarms.create('sessionPoller', { periodInMinutes: 5 })
  chrome.alarms.create('notificationPoller', { periodInMinutes: 60 })
  chrome.alarms.create('pruneLog', { periodInMinutes: 2 })

  chrome.alarms.onAlarm.addListener(alarmHandler(bgStore))

  chrome.runtime.onMessage.addListener(messageHandler(bgStore))

  chrome.management.onEnabled.addListener(ublockStatusChangeHandler(bgStore))
  chrome.management.onDisabled.addListener(ublockStatusChangeHandler(bgStore))

  chrome.permissions.onAdded.addListener(handlePermissionsAdded(bgStore))
  chrome.permissions.onRemoved.addListener(handlePermissionsRemoved(bgStore))

  chrome.commands.onCommand.addListener(handleKeyboardCommand(bgStore))

  chrome.contextMenus.onClicked.addListener(() => chrome.tabs.create({ url: 'debugLog.html' }))
} catch (err) {
  pushToDebugLog({
    level: 'ERROR',
    tag: 'background',
    message: 'Error in a main thread of background service worker',
    data: serializeError(err),
  })
}
