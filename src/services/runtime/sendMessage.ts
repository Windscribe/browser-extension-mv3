import { pushToDebugLog } from 'services/debugLog'

type SendMessageType = typeof chrome.runtime.sendMessage
type SendMessageReturnType = ReturnType<SendMessageType>

type SendMessageFunction = {
  (message: object): SendMessageReturnType | undefined
}

const sendMessage: SendMessageFunction = message => {
  try {
    return chrome.runtime.sendMessage(message)
  } catch (err) {
    pushToDebugLog({
      message: 'Error while sending message through runtime',
      level: 'ERROR',
      data: JSON.stringify(err),
    })
  }
}

export default sendMessage
