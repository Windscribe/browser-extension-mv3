import log from 'utils/log'
import { initializeWrappedStore, store } from 'state'
import { connectProxy, disconnectProxy } from 'state/slices/proxy'
import setDebuggerAuth from './debuggerAuth'

initializeWrappedStore().then(() => {
  log('bg store was initialized')
})

chrome.storage.local.get(null).then(storage => {
  log('bg storage:', storage)
})

chrome.storage.onChanged.addListener(function (changes) {
  if (
    changes[1]?.newValue?.servers?.isConnected &&
    JSON.stringify(changes[1].newValue.servers.serverCredentials) !==
      JSON.stringify(changes[1].oldValue.servers.serverCredentials)
  ) {
    setDebuggerAuth(changes[1].newValue.servers.serverCredentials)
  }
})

chrome.proxy.onProxyError.addListener(() => {
  chrome.storage.local.get(null).then(storage => {
    if (storage[1].connection.failover === 'Auto / Best') {
      //Connect to autopilot
      // store.dispatch(connectProxy(storage[1].servers.autopilot.dataCenter.hosts[0].hostname))
    }
    if (storage[1].connection.failover === 'Same Country') {
      // Connect to server from same country
    }
    if (storage[1].connection.failover === 'None') {
      // Disconnect
      // store.dispatch(disconnectProxy())
    }
  })
})
