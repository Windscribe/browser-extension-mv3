/**
 * Retrieve object from Chrome's Local StorageArea
 * @param {string} key
 */
const getStorage = async key =>
  new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(key, function (value) {
        resolve(value[key])
      })
    } catch (ex) {
      reject(ex)
    }
  })

/**
 * Save Object in Chrome's Local StorageArea
 * @param {*} obj
 */
const setStorage = async obj =>
  new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set(obj, function () {
        resolve()
      })
    } catch (ex) {
      reject(ex)
    }
  })

/**
 * Removes Object from Chrome Local StorageArea.
 *
 * @param {string or array of string keys} keys
 */
const removeStorage = async keys =>
  new Promise((resolve, reject) => {
    try {
      chrome.storage.local.remove(keys, function () {
        resolve()
      })
    } catch (ex) {
      reject(ex)
    }
  })

export { getStorage, setStorage, removeStorage }
