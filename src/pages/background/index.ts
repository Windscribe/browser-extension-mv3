import log from 'utils/log'
import getErrorMessage from 'utils/getErrorMessage'
import { initializeWrappedStore } from 'state'
import { connectProxy, disconnectProxy, setConnectionError } from 'state/slices/proxy'
import browserApi from 'services/browserApi'
import { addContextMenuItem } from 'services/contextMenu'
import setDebuggerAuth from './debuggerAuth'
import { setCurrentDataCenter } from 'state/slices/currentDataCenter'
import { connectToAutopilot } from 'state/slices/autopilot'

const bgStore = initializeWrappedStore().then(store => {
  log('bg store was initialized')
  return store
})

chrome.storage.onChanged.addListener(function (changes) {
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
      store.dispatch(setConnectionError('No session auth hash is available'))
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
    store?.dispatch(setConnectionError(message))
  }
}

chrome.proxy.onProxyError.addListener(async e => {
  // TODO push error to debugLog
  console.log('%c onProxyError ', 'background: #383E49; color: #1ADEAE', e)

  const store = await bgStore
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
