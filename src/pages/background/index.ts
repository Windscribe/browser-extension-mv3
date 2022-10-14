import log from 'utils/log'
import { initializeWrappedStore } from 'state'
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
