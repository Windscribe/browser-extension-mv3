import log from 'utils/log'
import getErrorMessage from 'utils/getErrorMessage'
import { initializeWrappedStore } from 'state'
import { connectProxy, disconnectProxy, setConnectionError } from 'state/slices/proxy'
import browserApi from 'services/browserApi'
import setDebuggerAuth from './debuggerAuth'
import { setCurrentDataCenter } from 'state/slices/currentDataCenter'
import { connectToAutopilot } from 'state/slices/autopilot'

const bgStore = initializeWrappedStore().then(store => {
  log('bg store was initialized')
  return store
})

chrome.storage.onChanged.addListener(function (changes) {
  if (
    JSON.stringify(changes[1].newValue.servers.serverCredentials) !==
    JSON.stringify(changes[1].oldValue.servers.serverCredentials)
  ) {
    setDebuggerAuth(changes[1].newValue.servers.serverCredentials)
  }
})

browserApi.runtime.onStartup.addListener(onStartupCallback)

async function onStartupCallback() {
  let store
  try {
    store = await bgStore
    const authHash = store.getState().session.session_auth_hash
    if (!authHash) {
      store.dispatch(setConnectionError('No session auth hash is available'))
      return
    }

    const currentHostname = store.getState().currentDataCenter?.hosts?.[0].hostname
    if (currentHostname) {
      store.dispatch(connectProxy(currentHostname))
    } else {
      store.dispatch(connectToAutopilot())
    }
  } catch (err) {
    const message = getErrorMessage(err)
    store?.dispatch(setConnectionError(message))
  }
}

chrome.proxy.onProxyError.addListener(async () => {
  const store = await bgStore
  const failover = store.getState().connection.failover
  if (failover === 'Auto / Best') {
    // TO DO: Fix this after fixing auto pilot
    // store.dispatch(connectProxy(storage[1].servers.autopilot.dataCenter.hosts[0].hostname))
  } else if (failover === 'Same Country') {
    const currentLocation = store.getState().currentLocation
    const currentDataCenter = store.getState().currentDataCenter

    const newDatacenter = currentLocation.groups?.find(
      dataCenter => dataCenter.id !== currentDataCenter.id,
    )

    if (newDatacenter) {
      store.dispatch(setCurrentDataCenter(newDatacenter))
      store.dispatch(connectProxy(newDatacenter.hosts[0].hostname))
    }
  } else if (failover === 'None') {
    store.dispatch(disconnectProxy())
  }
})
