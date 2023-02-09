import locales from 'utils/locales'
import getErrorMessage from 'utils/getErrorMessage'
import browserApi from 'services/browserApi'
import { addContextMenuItem } from 'services/contextMenu'
import setDebuggerAuth from './debuggerAuth'
import { initializeWrappedStore } from 'state'
import { pushToDebugLog } from 'state/slices/debugLog'
import { connectToAutopilot } from 'state/slices/autopilot'
import { setCurrentDataCenter } from 'state/slices/currentDataCenter'
import { connectProxy, disconnectProxy, handleConnectionError } from 'state/slices/proxy'
import { locationWarp, languageWarp, splitPersonality } from '../content'

const bgStore = initializeWrappedStore().then(store => {
  store.dispatch(pushToDebugLog({ message: 'Bg store was initialized', tag: 'background' }))
  return store
})

chrome.storage.onChanged.addListener(function (changes) {
  if (!changes[1].newValue || !changes[1].oldValue) return

  const { username: newUsername, password: newPassword } = changes[1].newValue.serverCredentials
  const { username: oldUsername, password: oldPassword } = changes[1].oldValue.serverCredentials

  if (!newUsername || !newPassword) return

  if (newUsername !== oldUsername || newPassword !== oldPassword) {
    const credentials = {
      username: newUsername,
      password: newPassword,
    }
    setDebuggerAuth(credentials)
  }
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

chrome.proxy.onProxyError.addListener(async e => {
  // TODO Implement counter. If 3 unsuccesfull attempts to connect stop it
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

  const failover = store.getState().connection.failover
  if (failover === 'Auto / Best') {
    await store.dispatch(connectToAutopilot())
  } else if (failover === 'Same Country') {
    const currentLocation = store.getState().currentLocation
    const currentDataCenter = store.getState().currentDataCenter

    const newDatacenter = currentLocation.groups?.find(
      dataCenter => dataCenter.id !== currentDataCenter.id,
    )

    if (newDatacenter) {
      store.dispatch(setCurrentDataCenter(newDatacenter))
      store.dispatch(connectProxy(newDatacenter.hosts))
    }
  } else if (failover === 'None') {
    store.dispatch(disconnectProxy())
  }
})

type Coords = { latitude: string; longitude: string }
const executeScript = async <Data extends string | Coords>(
  tabId: number,
  data: Data,
  func: (data: Data) => void,
) => {
  chrome.scripting.executeScript({
    args: [data],
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
