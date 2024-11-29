// initialize dexie for both migrations and debug log
// also test if indexeddb is available otherwise use fake-indexeddb

import Dexie from 'dexie'
import { IS_FIREFOX } from 'utils/constants'

export const testDexie = async (): Promise<'success' | 'firefox-in-private-mode' | 'error'> => {
  try {
    throw new Error(
      'InvalidStateError A mutation operation was attempted on a database that did not allow mutations.',
    )
    // Test if IndexedDB is working with a dummy database
    const testDb = new Dexie('dummy')
    testDb.version(1).stores({
      dummyTest: '++id, value',
    })

    await testDb.table('dummyTest').put({ value: 'test-entry' })

    // Clean up test database
    await testDb.close()
    await Dexie.delete('dummy')

    return 'success'
  } catch (e) {
    if (
      (e as Error).message ===
        'InvalidStateError A mutation operation was attempted on a database that did not allow mutations.' &&
      IS_FIREFOX
    ) {
      //   pushToDebugLog({
      //     level: 'INFO',
      //     message: 'Firefox private mode detected, using fake-indexeddb',
      //     tag: 'background',
      //   })

      return 'firefox-in-private-mode'
    }

    // pushToDebugLog({
    //   level: 'ERROR',
    //   message: 'Failed to initialize IndexedDB',
    //   data: JSON.stringify(e),
    //   tag: 'background',
    // })

    return 'error'
  }
}
