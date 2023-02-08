import getErrorMessage from 'utils/getErrorMessage'
import { initializeWrappedStore } from 'state'
import { connectProxy, disconnectProxy, handleConnectionError } from 'state/slices/proxy'
import { pushToDebugLog } from 'state/slices/debugLog'
import browserApi from 'services/browserApi'
import { addContextMenuItem } from 'services/contextMenu'
import setDebuggerAuth from './debuggerAuth'
import { setCurrentDataCenter } from 'state/slices/currentDataCenter'
import { connectToAutopilot } from 'state/slices/autopilot'
import { setReconnectionAttempts } from 'state/slices/connection'

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

chrome.runtime.onInstalled.addListener(addContextMenuItem)
