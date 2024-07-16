import { LogItemResponse, Message } from 'api/types'
import { pushToDebugLog } from 'services/debugLog'
import getErrorMessage from 'utils/getErrorMessage'

const NO_IP = '---.---.---.---'

export default async function checkIp(workingApi: string): Promise<string> {
  await setupOffscreenDocument()

  if (!workingApi) {
    return NO_IP
  }

  const ip = await fetchIp(workingApi)
  return ip || NO_IP
}

async function setupOffscreenDocument() {
  await pushToDebugLog({
    message: 'Setting up offscreen document checkIpOffscreen.html',
  })
  const offscreenUrl = chrome.runtime.getURL('checkIpOffscreen.html')
  if (!(await chrome.offscreen.hasDocument())) {
    await pushToDebugLog({
      message: 'Created offscreen document checkIpOffscreen.html',
    })
    await chrome.offscreen.createDocument({
      url: offscreenUrl,
      reasons: [chrome.offscreen.Reason.IFRAME_SCRIPTING],
      justification: '407 authentication',
    })
  }

  await pushToDebugLog({
    message: 'Sending message to offscreen document checkIpOffscreen.html',
  })

  const result = await chrome.runtime.sendMessage<Message, LogItemResponse>({
    target: 'offscreen',
    type: 'fireNoSSLRequest',
  })

  await pushToDebugLog({
    message: 'Receieved message from offscreen document checkIpOffscreen.html, closing now',
    data: result,
  })
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
