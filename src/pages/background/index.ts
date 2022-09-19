import log from 'utils/log'
import { initializeWrappedStore } from 'state'

initializeWrappedStore().then(() => {
  log('bg store was initialized')
})

chrome.storage.local.get(null).then(storage => {
  log('bg storage:', storage)
})
