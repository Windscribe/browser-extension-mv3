import log from 'utils/log'
import browserApi from 'services/browserApi'
import { initializeWrappedStore } from 'state'
import { WAKE_UP_NEO } from 'utils/constants'

browserApi.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type === WAKE_UP_NEO) {
    sendResponse({ type: 'background-service-worker-is-running' })
  }
})

initializeWrappedStore().then(() => {
  log('bg store was initialized')
})
chrome.storage.local.get(null).then(storage => {
  log('bg storage:', storage)
})
