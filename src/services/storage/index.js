import Dexie from 'dexie'
import { testDexie } from 'utils/initializeDexie'

async function createLogDB() {
  const res = await testDexie()

  // Set up fake IndexedDB before any database creation
  if (res === 'firefox-in-private-mode') {
    return chrome.storage?.local
  }

  // Create database after dependencies are set
  const db = new Dexie('LogDatabase')
  db.version(1).stores({
    logs: '++id, timestamp, date, tag, level, message, data',
  })

  return db
}

// Initialize Dexie database
let logDB = await createLogDB()

/**
 * Retrieve object from Dexie database.
 * @param {string} key
 */
const getStorage = async () => {
  const isLocalStorage = logDB === chrome.storage?.local
  try {
    if (isLocalStorage) {
      const data = await chrome.storage.local.get('debugLog')
      console.log('Retrieved data from chrome.storage.local:', data.debugLog)
      return data?.debugLog ?? []
    } else {
      const res = await logDB.logs.toArray()
      console.log('Retrieved data from Dexie:', res)
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
  const isLocalStorage = logDB === chrome.storage?.local
  try {
    isLocalStorage ? await chrome.storage.local.set({ debugLog: [] }) : await logDB.logs.clear()
  } catch (ex) {
    console.error(`Error clearing ${isLocalStorage ? 'chrome.storage.local' : 'Dexie'}:`, ex)
    throw ex
  }
}

export { getStorage, addToLogDB, clearLogDB, logDB }
