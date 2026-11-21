// Model only the browser messaging transport. The real webext-redux package
// and a real Redux store are used by the callers of this helper.
global.self = global

function createHarness(tabCount) {
  const workerListeners = []
  const workerExternalListeners = []
  const pages = new Set()
  const counts = { tabQueries: 0, tabMessages: 0, runtimeBroadcasts: 0 }

  const worker = {
    runtime: {
      onMessage: { addListener: listener => workerListeners.push(listener) },
      onMessageExternal: { addListener: listener => workerExternalListeners.push(listener) },
      sendMessage(message, callback) {
        counts.runtimeBroadcasts++
        for (const listeners of pages) {
          for (const listener of listeners) listener(message, {}, () => {})
        }
        if (callback) callback()
      },
    },
    tabs: {
      query(_query, callback) {
        counts.tabQueries++
        callback(Array.from({ length: tabCount }, (_, id) => ({ id: id + 1 })))
      },
      sendMessage(_tabId, _message, callback) {
        counts.tabMessages++
        if (callback) callback()
      },
    },
  }

  function page() {
    const listeners = []
    pages.add(listeners)
    return {
      runtime: {
        onMessage: { addListener: listener => listeners.push(listener) },
        sendMessage(_extensionId, message, _options, callback) {
          // Real extension messaging is asynchronous. In particular, the
          // proxy's constructor finishes before its fetch response arrives.
          queueMicrotask(() => {
            for (const listener of workerListeners) {
              listener(message, { id: 'test-extension' }, callback)
            }
          })
        },
      },
    }
  }

  function restartWorker() {
    workerListeners.length = 0
    workerExternalListeners.length = 0
  }

  return { worker, page, counts, restartWorker }
}

module.exports = { createHarness }
