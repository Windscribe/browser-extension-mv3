import { LogItemResponse, Message } from 'api/types'
import { pushToDebugLog } from 'services/debugLog'
import getErrorMessage from 'utils/getErrorMessage'
import { serializeError } from 'serialize-error'

export const NO_IP = '---.---.---.---'

export default async function checkIp(workingApi: string): Promise<string> {
  const result = await chrome.runtime.sendMessage<Message, LogItemResponse>({
    target: 'offscreen',
    type: 'fireNoSSLRequest',
  })

  await pushToDebugLog({
    message: 'Receieved message from offscreen document checkIpOffscreen.html, closing now',
    data: result,
  })

  if (!workingApi) {
    return NO_IP
  }

  const ip = await fetchIp(workingApi)
  return ip || NO_IP
}

async function fetchIp(workingApi: string): Promise<string> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 3000)

  const res = await fetch(`https://checkip.${workingApi}`, {
    signal: controller.signal,
  })
    .then(r => r.text())
    .catch(err => {
      const message = getErrorMessage(err)
      pushToDebugLog({
        data: serializeError(err),
        message,
      })
      return NO_IP
    })

  clearTimeout(timeoutId)

  return res
}
