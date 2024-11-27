import { initializeWrappedStore } from 'state'
import { chooseIcon } from 'state/slices/iconVariant'
import { pushToDebugLog } from 'services/debugLog'
import {
  alarmHandler,
  authRequiredHandler,
  onInstalledHandler,
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

try {
  const bgStore = initializeWrappedStore().then(async store => {
    pushToDebugLog({ message: 'Bg store was initialized', tag: 'background' })
    const grantedPermissions = await chrome.permissions.getAll()
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

  chrome.contextMenus.onClicked.addListener(() => chrome.tabs.create({ url: 'debugLog.html' }))
} catch (err) {
  pushToDebugLog({
    level: 'ERROR',
    tag: 'background',
    message: 'Error in a main thread of background service worker',
    data: serializeError(err),
  })
}
