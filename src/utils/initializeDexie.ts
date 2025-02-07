import { IS_FIREFOX } from 'utils/constants'
const testDBName = 'test'

export const testDexie = async (): Promise<'success' | 'firefox-in-private-mode' | 'error'> => {
  return new Promise(resolve => {
    const request = (globalThis.window || self).indexedDB.open(testDBName)

    request.onerror = event => {
      const error = (event.target as IDBOpenDBRequest).error
      if (
        error?.message ===
          'A mutation operation was attempted on a database that did not allow mutations.' &&
        IS_FIREFOX
      ) {
        resolve('firefox-in-private-mode')
        return
      }
      resolve('error')
    }

    request.onsuccess = () => {
      // result can be undefined if the request is aborted
      const db = request?.result

      if (!db) {
        resolve('error')
        return
      }

      db.close()
      ;(globalThis.window || self).indexedDB.deleteDatabase(testDBName)

      resolve('success')
    }
  })
}
