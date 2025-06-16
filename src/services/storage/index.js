import Dexie from 'dexie'
import { testDexie } from 'utils/initializeDexie'

let dbInstance = null
let dbInitPromise = null
const LOG_DATABASE_NAME = 'LogDatabase'

// Cannot do top level await due to chrome extension service worker handlers, as a top level await will block the handler from being registered, handlers must always be registered before any await and not as a result of an await

// https://www.jonmellman.com/posts/singleton-promises#the-race-condition
// https://www.jonmellman.com/posts/promise-memoization

async function createLogDB() {
  // Case 1: Happy path - cached instance
  if (dbInstance) {
    return dbInstance
  }

  // Case 2: Concurrent initialization
  if (dbInitPromise) {
    try {
      return await dbInitPromise
    } catch (error) {
      console.error('Error waiting on existing promise', error)
      // If waiting on an existing promise fails, allow retry
      dbInitPromise = null
      // Don't return - fall through to new initialization
    }
  }

  // Case 3: New initialization
  dbInitPromise = (async () => {
    try {
      const res = await testDexie()

      if (res === 'firefox-in-private-mode') {
        dbInstance = chrome.storage?.local
        return dbInstance
      }

      const db = new Dexie(LOG_DATABASE_NAME)
      db.version(1).stores({
        logs: '++id, timestamp, date, tag, level, message, data',
      })

      dbInstance = db
      return dbInstance
    } catch (error) {
      // Clear both instance and promise on failure
      dbInstance = null
      throw error
    }
  })()

  try {
    return await dbInitPromise
  } finally {
    // Always clear initialization promise
    dbInitPromise = null
  }
}

/**
 * Retrieve object from Dexie database.
 * @param {string} key
 */
const getStorage = async () => {
  const logDB = await createLogDB()
  const isLocalStorage = logDB === chrome.storage?.local
  try {
    if (isLocalStorage) {
      const data = await chrome.storage.local.get('debugLog')
      return data?.debugLog ?? []
    } else {
      const res = await logDB.logs.toArray()
      return res
    }
  } catch (ex) {
    console.error(
      `Error getting data from ${isLocalStorage ? 'chrome.storage.local' : 'Dexie'}:`,
      ex,
    )
    throw ex
  }
}

/**
 * Save Object in Dexie database.
 * @param {Object} obj - The log object to be saved.
 */
const addToLogDB = async logs => {
  const logDB = await createLogDB()
  try {
    const isLocalStorage = logDB === chrome.storage?.local

    if (isLocalStorage) {
      await chrome.storage.local.set({ debugLog: logs })
    } else {
      await logDB.logs[Array.isArray(logs) ? 'bulkPut' : 'put'](logs)
    }
  } catch (ex) {
    console.error(`Error saving data to ${isLocalStorage ? 'chrome.storage.local' : 'Dexie'}:`, ex)
    throw ex
  }
}

/**
 * Remove Object from Dexie database by key.
 * @param {string | Array<string>} keys - The keys of the entries to remove.
 */
const clearLogDB = async () => {
  const logDB = await createLogDB()
  const isLocalStorage = logDB === chrome.storage?.local
  try {
    isLocalStorage ? await chrome.storage.local.set({ debugLog: [] }) : await logDB.logs.clear()
  } catch (ex) {
    console.error(`Error clearing ${isLocalStorage ? 'chrome.storage.local' : 'Dexie'}:`, ex)
    throw ex
  }
}

export { getStorage, addToLogDB, clearLogDB, createLogDB }
