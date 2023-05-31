import browserApi from 'services/browserApi'
import { initializeWrappedStore } from 'state'
import { chooseIcon } from 'state/slices/iconVariant'
import { pushToDebugLog } from 'state/slices/debugLog'
import { addContextMenuItem } from 'services/contextMenu'
import type { WorkerNavigatorWithConnection } from 'utils/navigatorNetworkInformation'
import {
  alarmHandler,
  authRequiredHandler,
  connectionChangedHandler,
  navigationCommittedHandler,
  proxyErrorHandler,
  startupHandler,
  messageHandler,
} from './eventHandlers'

const bgStore = initializeWrappedStore().then(store => {
  store.dispatch(pushToDebugLog({ message: 'Bg store was initialized', tag: 'background' }))
  //TODO dispatch it only if it is not in pending state already
  store.dispatch(chooseIcon())
  return store
})

chrome.runtime.onInstalled.addListener(addContextMenuItem)

browserApi.runtime.onStartup.addListener(startupHandler(bgStore))

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

chrome.runtime.onMessage.addListener(messageHandler)

// This is experimental feature and currently nor supported by FF
// Also it might not work in Brave browser
// @link https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/change_event
declare const self: ServiceWorkerGlobalScope
const _navigator = self.navigator as WorkerNavigatorWithConnection
_navigator?.connection?.addEventListener('change', connectionChangedHandler(bgStore))
