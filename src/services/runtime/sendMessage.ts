import { pushToDebugLog } from 'services/debugLog'
import { serializeError } from 'serialize-error'

const sendMessage = async (message: object): Promise<unknown> => {
  try {
    return await chrome.runtime.sendMessage(message)
  } catch (err) {
    pushToDebugLog({
      message: 'Error while sending message through runtime',
      level: 'ERROR',
      data: serializeError(err),
    })
  }
}

export default sendMessage
