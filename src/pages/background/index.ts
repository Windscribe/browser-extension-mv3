import locales from 'utils/locales'
import getErrorMessage from 'utils/getErrorMessage'
import browserApi from 'services/browserApi'
import { addContextMenuItem } from 'services/contextMenu'
import setDebuggerAuth from './debuggerAuth'
import spoofLanguage from './executingScripts/spoofLanguage'
import { initializeWrappedStore } from 'state'
import { pushToDebugLog } from 'state/slices/debugLog'
import { connectToAutopilot } from 'state/slices/autopilot'
import { setCurrentDataCenter } from 'state/slices/currentDataCenter'
import { connectProxy, disconnectProxy, handleConnectionError } from 'state/slices/proxy'

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

chrome.runtime.onInstalled.addListener(addContextMenuItem)
// chrome.webNavigation.onCommitted.addListener(injectLanguageWarp)

// type OnCommittedHandlerParam = chrome.webNavigation.WebNavigationCallbackDetails

// async function injectLanguageWarp(details: OnCommittedHandlerParam): Promise<void> {
//   const store = await bgStore

//   if (!store.getState().languageWarpEnabled) return
//   // if (!store.getState().proxy.isConnected) return

//   const currentCountryCode = store.getState().currentLocation.country_code || 'AUTO'
//   const spoofedLocaleCode = locales[currentCountryCode].locale || 'Esperanto'

//   chrome.scripting.executeScript({
//     target: { tabId: details.tabId, allFrames: true },
//     world: 'MAIN',
//     func: spoofLanguage,
//     args: [spoofedLocaleCode],
//   })
// }

declare global {
  interface Window {
    spoofedLocaleCode: string
  }
}

const injectLanguageWarp = async (e: any) => {
  const store = await bgStore

  if (!store.getState().languageWarpEnabled) return

  const currentCountryCode = store.getState().currentLocation.country_code || 'AUTO'
  const spoofedLocaleCode = locales[currentCountryCode].locale || 'en'

  chrome.scripting.executeScript(
    {
      args: [JSON.stringify(spoofedLocaleCode)],
      target: { tabId: e.tabId, allFrames: true },
      world: 'MAIN',
      injectImmediately: true,
      func: spoofedLocaleCode => (window.spoofedLocaleCode = spoofedLocaleCode),
    },
    () => {
      chrome.scripting.executeScript({
        target: { tabId: e.tabId, allFrames: true },
        world: 'MAIN',
        injectImmediately: true,
        files: ['/content/languageWarp.js'],
      })
    },
  )
}

chrome.webNavigation.onCommitted.addListener(injectLanguageWarp)
