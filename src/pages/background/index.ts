import getErrorMessage from 'utils/getErrorMessage'
import { initializeWrappedStore } from 'state'
import { connectProxy, disconnectProxy, handleConnectionError } from 'state/slices/proxy'
import { pushToDebugLog } from 'state/slices/debugLog'
import browserApi from 'services/browserApi'
import { addContextMenuItem } from 'services/contextMenu'
import setDebuggerAuth from './debuggerAuth'
import { setCurrentDataCenter } from 'state/slices/currentDataCenter'
import { connectToAutopilot } from 'state/slices/autopilot'

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

declare global {
  interface Window {
    locationWarpInfo: string
  }
}

const injectLocationWarp = async (e: any) => {
  const store = await bgStore

  if (!store.getState().locationWarp) return

  const coords = store.getState().currentDataCenter?.gps?.split(',')

  if (!coords) return

  const locationWarpInfo = {
    latitude: coords[0],
    longitude: coords[1],
  }

  chrome.scripting.executeScript(
    {
      args: [JSON.stringify(locationWarpInfo)],
      target: { tabId: e.tabId, allFrames: true },
      world: 'MAIN',
      injectImmediately: true,
      func: locationWarpInfo => (window.locationWarpInfo = locationWarpInfo),
    },
    () => {
      chrome.scripting.executeScript({
        target: { tabId: e.tabId, allFrames: true },
        world: 'MAIN',
        injectImmediately: true,
        files: ['/content/locationWarp.js'],
      })
    },
  )
}

chrome.webNavigation.onCommitted.addListener(injectLocationWarp)
chrome.runtime.onInstalled.addListener(addContextMenuItem)
