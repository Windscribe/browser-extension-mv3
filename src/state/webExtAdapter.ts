/* 
	The place for webext-redux dependent logic.
*/

import { wrapStore } from '@eduardoac-skimlinks/webext-redux'

import browserApi from 'services/browserApi'
import { buildFrom, type StoreType } from './store'
import { STORAGE_CACHE_VERSION, REACT_APP_REDUX_PORT } from 'utils/constants'

export async function initializeWrappedStore(): Promise<StoreType> {
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

  await browserApi.saveStateInStorage(store.getState())
  store.subscribe(async () => {
    await browserApi.saveStateInStorage(store.getState())
  })

  return store
}
