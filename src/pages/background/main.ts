import { initializeWrappedStore } from 'state'
import { chooseIcon } from 'state/slices/iconVariant'
import { pushToDebugLog } from 'services/debugLog'
import type { WorkerNavigatorWithConnection } from 'utils/navigatorNetworkInformation'
import {
  alarmHandler,
  authRequiredHandler,
  connectionChangedHandler,
  onInstalledHandler,
  navigationCommittedHandler,
  proxyErrorHandler,
  startupHandler,
  messageHandler,
} from './eventHandlers'

declare const self: ServiceWorkerGlobalScope

try {
  const bgStore = initializeWrappedStore().then(store => {
    pushToDebugLog({ message: 'Bg store was initialized', tag: 'background' })
    //TODO dispatch it only if it is not in pending state already
    store.dispatch(chooseIcon())
    return store
  })

  chrome.runtime.onInstalled.addListener(onInstalledHandler(bgStore))

  chrome.runtime.onStartup.addListener(startupHandler(bgStore))

  chrome.webNavigation.onCommitted.addListener(navigationCommittedHandler(bgStore))

  chrome.proxy.onProxyError.addListener(proxyErrorHandler(bgStore))

  chrome.webRequest.onAuthRequired.addListener(
    authRequiredHandler(bgStore),
    { urls: ['<all_urls>'] },
    ['asyncBlocking'],
  )

  chrome.alarms.create('sessionPoller', { periodInMinutes: 10 })
  chrome.alarms.create('notificationPoller', { periodInMinutes: 720 })
  chrome.alarms.onAlarm.addListener(alarmHandler(bgStore))

  chrome.runtime.onMessage.addListener(messageHandler(bgStore))

  chrome.contextMenus.onClicked.addListener(() => chrome.tabs.create({ url: 'debugLog.html' }))

  // This is experimental feature and currently nor supported by FF
  // Also it might not work in Brave browser
  // @link https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/change_event
  const _navigator = self.navigator as WorkerNavigatorWithConnection
  _navigator?.connection?.addEventListener('change', connectionChangedHandler(bgStore))
} catch (err) {
  pushToDebugLog({
    level: 'ERROR',
    tag: 'background',
    message: 'Error in a main thread of background service worker',
    data: JSON.stringify(err),
  })
}
