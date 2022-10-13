import log from 'utils/log'
import { initializeWrappedStore } from 'state'
import setDebuggerAuth from './debuggerAuth'
import { connectProxy } from 'utils/proxyConfig'
import store from 'state/store'
import {
  setServerList,
  setCurrentLocation,
  setCurrentDataCenter,
  setIsConnected,
  setAutopilot,
  setAutopilotSelected,
  setServerCredetials,
} from 'state/slices/servers'

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

chrome.proxy.onProxyError.addListener(e => {
  console.log(e)
  chrome.storage.local.get(null).then(storage => {
    log('helllllo:', storage)
    if (storage[1].connection.failover === 'Auto / Best') {
      store.dispatch(setAutopilotSelected(true))
      connectProxy(storage[1].servers.autopilot.dataCenter.hosts[0].hostname)
    }
    if (storage[1].connection.failover === 'Same Country') {
      connectProxy(storage[1].servers.autopilot.dataCenter.hosts[0].hostname)
    }
    if (storage[1].connection.failover === 'None') {
      connectProxy(storage[1].servers.autopilot.dataCenter.hosts[0].hostname)
    }
  })
})
