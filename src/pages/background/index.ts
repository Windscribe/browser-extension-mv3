import log from 'utils/log'
import getErrorMessage from 'utils/getErrorMessage'
import { initializeWrappedStore } from 'state'
import { connectProxy, setConnectionError, connectToBestLocation } from 'state/slices/proxy'
import browserApi from 'services/browserApi'
import setDebuggerAuth from './debuggerAuth'

const bgStore = initializeWrappedStore().then(store => {
  log('bg store was initialized')
  return store
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
      store.dispatch(connectToBestLocation())
    }
  } catch (err) {
    const message = getErrorMessage(err)
    store?.dispatch(setConnectionError(message))
  }
}
