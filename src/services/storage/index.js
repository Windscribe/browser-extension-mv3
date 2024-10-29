import Dexie from 'dexie'

// Initialize Dexie database
const logDB = new Dexie('LogDatabase')
logDB.version(1).stores({
  logs: '++id, timestamp, date, tag, level, message, data',
})

/**
 * Retrieve object from Dexie database.
 * @param {string} key
 */
const getStorage = async () => {
  try {
    return await logDB.logs.toArray()
  } catch (ex) {
    console.error('Error getting data from Dexie:', ex)
    throw ex
  }
}

/**
 * Save Object in Dexie database.
 * @param {Object} obj - The log object to be saved.
 */
const addToLogDB = async logs => {
  try {
    if (Array.isArray(logs)) {
      await logDB.logs.bulkPut(logs) // Use bulkPut for multiple log entries
    } else {
      await logDB.logs.put(logs) // Use put for a single log entry
    }
  } catch (ex) {
    console.error('Error saving data to Dexie:', ex)
    throw ex
  }
}

/**
 * Remove Object from Dexie database by key.
 * @param {string | Array<string>} keys - The keys of the entries to remove.
 */
const clearLogDB = async () => {
  try {
    await logDB.logs.clear()
  } catch (ex) {
    console.error('Error removing data from Dexie:', ex)
    throw ex
  }
}

export { getStorage, addToLogDB, clearLogDB, logDB }
