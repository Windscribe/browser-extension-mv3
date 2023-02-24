import locales from 'utils/locales'
import type { Coords } from 'utils/types'
import getErrorMessage from 'utils/getErrorMessage'
import browserApi from 'services/browserApi'
import { addContextMenuItem } from 'services/contextMenu'
import { initializeWrappedStore } from 'state'
import { pushToDebugLog } from 'state/slices/debugLog'
import { setCurrentDataCenter } from 'state/slices/currentDataCenter'
import { setReconnectionAttempts } from 'state/slices/connection'
import { connectProxy, disconnectProxy, handleConnectionError } from 'state/slices/proxy'
import { locationWarp, languageWarp, splitPersonality } from '../content'

const bgStore = initializeWrappedStore().then(store => {
  store.dispatch(pushToDebugLog({ message: 'Bg store was initialized', tag: 'background' }))
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
/* TODO
Consider should we implement different recovery strategies: 
change location, change DC, check if Internet connection exist, re-fetch credentials. 
*/
chrome.proxy.onProxyError.addListener(async e => {
  if (process.env.NODE_ENV === 'development') {
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
  const { smokeWall, failover, reconnectionAttempts } = store.getState().connection

  if (smokeWall) {
    store.dispatch(disconnectProxy())
  }
  const RECONNECTION_ATTEMPTS_LIMIT = 3
  if (reconnectionAttempts >= RECONNECTION_ATTEMPTS_LIMIT) {
    store.dispatch(
      pushToDebugLog({
        level: 'ERROR',
        message: 'reconnection_attempts_limit reached',
        tag: 'background',
        data: reconnectionAttempts,
      }),
    )
    // TODO Consider to open Modal window with error message
    // to explain to the user what's going on.
    return
  }

  if (failover === 'Auto / Best') {
    store.dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
    await store.dispatch(connectToAutopilot())
  } else if (failover === 'Same Country') {
    const currentLocation = store.getState().currentLocation
    const currentDataCenter = store.getState().currentDataCenter

    const newDatacenter = currentLocation.groups?.find(
      dataCenter => dataCenter.id !== currentDataCenter.id,
    )

    if (newDatacenter) {
      store.dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
      store.dispatch(setCurrentDataCenter(newDatacenter))
      await store.dispatch(connectProxy(newDatacenter.hosts))
    }
  }
})

const executeScript = async <Args extends string | Coords>(
  tabId: number,
  args: Args,
  func: (args: Args) => void,
) => {
  chrome.scripting.executeScript({
    args: [args],
    target: { tabId: tabId, allFrames: true },
    world: 'MAIN',
    injectImmediately: true,
    func: func,
  })
}

type WebNavDetails = chrome.webNavigation.WebNavigationTransitionCallbackDetails

const injectWarps = async (details: WebNavDetails) => {
  const store = await bgStore

  const coords = store.getState().currentDataCenter?.gps?.split(',')

  if (store.getState().locationWarp && coords) {
    const locationWarpInfo: Coords = {
      latitude: coords[0],
      longitude: coords[1],
    }

    executeScript(details.tabId, locationWarpInfo, locationWarp)
  }

  if (store.getState().splitPersonalityEnabled && store.getState().userAgent.spoofed) {
    const spoofedUserAgent = store.getState().userAgent.spoofed

    executeScript(details.tabId, spoofedUserAgent, splitPersonality)
  }

  if (store.getState().languageWarpEnabled) {
    const currentCountryCode = store.getState().currentLocation.country_code || 'AUTO'
    const spoofedLocaleCode = locales[currentCountryCode].locale || 'en'

    executeScript(details.tabId, spoofedLocaleCode, languageWarp)
  }
}

chrome.webNavigation.onCommitted.addListener(injectWarps)
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
