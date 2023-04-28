import locales from 'utils/locales'
import getTimeWarp from 'utils/getTimeWarp'
import getErrorMessage from 'utils/getErrorMessage'
import type { Coords, TimeWarp } from 'utils/types'
import browserApi from 'services/browserApi'
import proxyError from 'services/proxyError'
import { addContextMenuItem } from 'services/contextMenu'
import { initializeWrappedStore } from 'state'
import { pushToDebugLog } from 'state/slices/debugLog'
import { connectToAutopilot } from 'state/slices/autopilot'
import { connectProxy, disconnectProxy, handleConnectionError } from 'state/slices/proxy'
import { setIsOnline } from 'state/slices/isOnline'
import { locationWarp, languageWarp, splitPersonality, timeWarp, workerBlock } from '../content'
import type { WorkerNavigatorWithConnection } from 'utils/navigatorNetworkInformation'
import { checkSessionStatus } from 'state/slices/session'
import { chooseIcon } from 'state/slices/iconVariant'

const bgStore = initializeWrappedStore().then(store => {
  store.dispatch(pushToDebugLog({ message: 'Bg store was initialized', tag: 'background' }))
  store.dispatch(chooseIcon())
  return store
})

browserApi.runtime.onStartup.addListener(onStartupCallback)

async function onStartupCallback() {
  let store
  try {
    store = await bgStore

    if (!store.getState().connection.autoConnect) {
      store.dispatch(disconnectProxy())
      return
    }

    const authHash = store.getState().session.session_auth_hash
    if (!authHash) {
      store.dispatch(handleConnectionError('No session auth hash is available'))
      return
    }

    const currentHosts = store.getState().currentDataCenter?.hosts
    const autopilotSelected = store.getState().autopilot.autopilotSelected
    if (!autopilotSelected && currentHosts) {
      await store.dispatch(connectProxy(currentHosts))
      return
    }

    await store.dispatch(connectToAutopilot())
  } catch (err) {
    const message = getErrorMessage(err)
    store?.dispatch(handleConnectionError(message))
  }
}

chrome.alarms.create('sessionPoller', { periodInMinutes: 1 })

chrome.alarms.onAlarm.addListener(async alarm => {
  if (alarm.name === 'sessionPoller') {
    const store = await bgStore
    store.dispatch(checkSessionStatus())
  }
})

chrome.proxy.onProxyError.addListener(async e => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('%c onProxyError ', 'background: #d8dEd9; color: #EA222E', e)
  }

  const store = await bgStore

  store.dispatch(
    pushToDebugLog({
      level: 'ERROR',
      message: 'onProxyError',
      tag: 'background',
      data: e,
    }),
  )

  const errorChecking = store.getState().proxy.errorChecking
  const isConnected = store.getState().proxy.isConnected
  const hasProxyError = !!store.getState().proxy.errorMessage

  const proxyFailure = isConnected && hasProxyError

  if (!errorChecking && !proxyFailure) {
    proxyError(store.dispatch)
  }
})

const executeScript = async <Data extends string | Coords | TimeWarp>(
  tabId: number,
  func: (data: Data) => void,
  data: Data,
) => {
  chrome.scripting.executeScript({
    target: { tabId: tabId, allFrames: true },
    world: 'MAIN',
    injectImmediately: true,
    func: func,
    args: [data],
  })
}

type WebNavDetails = chrome.webNavigation.WebNavigationTransitionCallbackDetails

const injectScripts = async (details: WebNavDetails) => {
  const store = await bgStore

  if (store.getState().workerBlock) {
    executeScript(details.tabId, workerBlock, '')
  }

  if (store.getState().splitPersonalityEnabled && store.getState().userAgent.spoofed) {
    const spoofedUserAgent = store.getState().userAgent.spoofed

    executeScript(details.tabId, splitPersonality, spoofedUserAgent)
  }

  if (!store.getState().proxy.isConnected) return
  if (store.getState().autopilot.autopilotSelected) return

  if (store.getState().locationWarp) {
    const coords = store.getState().currentDataCenter?.gps?.split(',')

    if (!coords) return

    const locationWarpInfo: Coords = {
      latitude: coords[0],
      longitude: coords[1],
    }

    executeScript(details.tabId, locationWarp, locationWarpInfo)
  }

  if (store.getState().languageWarpEnabled) {
    const currentCountryCode = store.getState().currentLocation.country_code || 'AUTO'
    const spoofedLocaleCode = locales[currentCountryCode].locale || 'en'

    executeScript(details.tabId, languageWarp, spoofedLocaleCode)
  }

  if (store.getState().timeWarpEnabled) {
    const currentLocationTimezone = store.getState().currentLocation.tz
    const spoofedTime = getTimeWarp(currentLocationTimezone)

    if (!spoofedTime) return

    executeScript(details.tabId, timeWarp, spoofedTime)
  }
}

chrome.webNavigation.onCommitted.addListener(injectScripts)
chrome.runtime.onInstalled.addListener(addContextMenuItem)
chrome.webRequest.onAuthRequired.addListener(
  async function (details, callback?: (response: chrome.webRequest.BlockingResponse) => void) {
    const store = await bgStore

    const { username, password } = store.getState().serverCredentials

    if (!username || !password) return

    callback &&
      callback({
        authCredentials: { username: atob(username), password: atob(password) },
      })
  },
  { urls: ['<all_urls>'] },
  ['asyncBlocking'],
)

const connectionChangedHandler = async () => {
  const isOnline = self?.navigator?.onLine
  if (typeof isOnline !== 'boolean') return
  const store = await bgStore
  store.dispatch(setIsOnline(isOnline))
}

// This is experimental feature and currently nor supported by FF
// Also it might not work in Brave browser
// @link https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/change_event
declare const self: ServiceWorkerGlobalScope
const _navigator = self.navigator as WorkerNavigatorWithConnection
_navigator?.connection?.addEventListener('change', connectionChangedHandler)
