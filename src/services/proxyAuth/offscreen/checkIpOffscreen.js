chrome.runtime.onMessage.addListener(handleMessages)

const worker = new Worker('checkIpWorker.js')

async function sendMessageToWorker(worker, message) {
  return new Promise((resolve, reject) => {
    function handleMessage(event) {
      resolve(event.data)
      worker.removeEventListener('message', handleMessage)
    }

    function handleError(error) {
      reject(error)
      worker.removeEventListener('error', handleError)
    }

    worker.addEventListener('message', handleMessage)
    worker.addEventListener('error', handleError)

    worker.postMessage(message)
  })
}

function handleMessages(message, sender, sendResponse) {
  // Return early if this message isn't meant for the offscreen script
  if (message.target !== 'offscreen') {
    return
  }

  switch (message.type) {
    case 'fireNoSSLRequest':
      // Important:
      // Reason for return true and using then's
      // https://stackoverflow.com/a/53024910
      // https://issuetracker.google.com/issues/314359857?pli=1

      // send message to worker and wait for it
      sendMessageToWorker(worker, 'nossl_call').then(res => sendResponse({ res }))

      break
    default:
      console.warn(`Unexpected message type received: '${message.type}'.`)
  }
  return true
}
