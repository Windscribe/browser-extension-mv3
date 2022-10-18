import log from 'utils/log'
import { initializeWrappedStore } from 'state'
import { connectProxy, disconnectProxy } from 'state/slices/proxy'
import setDebuggerAuth from './debuggerAuth'
import { setCurrentDataCenter } from 'state/slices/currentDataCenter'

const bgStore = initializeWrappedStore().then(store => {
  log('bg store was initialized')
  return store
})

chrome.storage.local.get(null).then(storage => {
  log('bg storage:', storage)
})

chrome.storage.onChanged.addListener(function (changes) {
  if (
    JSON.stringify(changes[1].newValue.servers.serverCredentials) !==
    JSON.stringify(changes[1].oldValue.servers.serverCredentials)
  ) {
    setDebuggerAuth(changes[1].newValue.servers.serverCredentials)
  }
})

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
