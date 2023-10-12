import { pushToDebugLog } from 'services/debugLog'

const sendMessage = async (message: object): Promise<unknown> => {
  try {
    return await chrome.runtime.sendMessage(message)
  } catch (err) {
    pushToDebugLog({
      message: 'Error while sending message through runtime',
      level: 'ERROR',
      data: JSON.stringify(err),
    })
  }
}

export default sendMessage
