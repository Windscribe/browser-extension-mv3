/* 
	The place for webext-redux dependent logic.
*/

import { wrapStore } from '@eduardoac-skimlinks/webext-redux'

import browserApi from 'services/browserApi'
import { buildFrom, type StoreType } from './store'
import { trimLogs } from 'services/debugLog'
import {
  STORAGE_CACHE_VERSION,
  REACT_APP_REDUX_PORT,
  THREE_DAYS_IN_MILLISECONDS,
} from 'utils/constants'
import { setupOffscreenDocument } from 'services/offscreenActions/offscreenController'

export async function initializeWrappedStore(): Promise<StoreType> {
  try {
    await trimLogs(THREE_DAYS_IN_MILLISECONDS)
  } catch (err) {
    console.error('Error in initializeWrappedStore:', err)
  }

  const stateFromStorage = await browserApi.getStateFromStorage()

  const lastStateFromStorage = stateFromStorage[STORAGE_CACHE_VERSION]

  const store: StoreType = buildFrom(lastStateFromStorage)

  wrapStore(store, { portName: REACT_APP_REDUX_PORT })

  /*
   * Clear the state information after the store has updated
   * After we store the state for a new cache version
   * in Chrome.store.local, clearState will remove any older cache versions
   * preventing us from exceeding its max quota allocation.
   */
  // await browserApi.clearStateInStorage()

  await setupOffscreenDocument('offscreenHub.html', [chrome.offscreen.Reason.IFRAME_SCRIPTING])

  await browserApi.saveStateInStorage(store.getState())

  store.subscribe(async () => {
    await browserApi.saveStateInStorage(store.getState())
  })

  return store
}
