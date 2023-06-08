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
  const offscreenUrl = chrome.runtime.getURL('checkIp.html')
  if (await chrome.offscreen.hasDocument()) {
    await chrome.offscreen.closeDocument()
  }

  chrome.offscreen.createDocument({
    url: offscreenUrl,
    reasons: [chrome.offscreen.Reason.IFRAME_SCRIPTING],
    justification: '407 authentication',
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
    .catch(() => NO_IP)

  clearTimeout(timeoutId)

  return res
}
