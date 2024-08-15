/* 
	The place for webext-redux dependent logic.
*/

import { wrapStore } from '@eduardoac-skimlinks/webext-redux'

import browserApi from 'services/browserApi'
import { buildFrom, type StoreType } from './store'
import { STORAGE_CACHE_VERSION, REACT_APP_REDUX_PORT } from 'utils/constants'
import { getStorage, setStorage } from 'services/storage'
import { trimLogs } from 'services/debugLog'
import { LogItem } from 'utils/types'
import getErrorMessage from 'utils/getErrorMessage'

export async function initializeWrappedStore(): Promise<StoreType> {
  const debugLog: LogItem[] = (await getStorage('debugLog')) ?? []

  const trimmedLog = await trimLogs()

  if (trimmedLog && !(trimmedLog instanceof Error)) {
    // set the trimmed storage only
    await setStorage({ trimmedLog })
  } else {
    if (trimmedLog instanceof Error) {
      // set error if it occurred
      debugLog.push({
        date: new Date().toLocaleString(),
        tag: 'popup',
        message: getErrorMessage(trimmedLog),
      })
      await setStorage({ debugLog })
    }
    // do nothing if no error or no trimming occured
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

  await browserApi.saveStateInStorage(store.getState())

  store.subscribe(async () => {
    await browserApi.saveStateInStorage(store.getState())
  })

  return store
}
