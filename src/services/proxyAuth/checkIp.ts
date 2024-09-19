import { LogItemResponse, Message } from 'api/types'
import { pushToDebugLog } from 'services/debugLog'
import getErrorMessage from 'utils/getErrorMessage'

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

  const domain = process.env.NODE_ENV !== 'production' ? 'windscribe.com' : workingApi

  const res = await fetch(`https://checkip.${domain}`, {
    signal: controller.signal,
  })
    .then(r => r.text())
    .catch(err => {
      const message = getErrorMessage(err)
      pushToDebugLog({
        data: JSON.stringify(err),
        message,
      })
      return NO_IP
    })

  clearTimeout(timeoutId)

  return res
}
