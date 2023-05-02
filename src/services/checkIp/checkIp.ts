import browserApi from 'services/browserApi'

export default async function checkIp(): Promise<string> {
  const state = await browserApi.getStateFromStorage()
  const noIp = '---.---.---.---'

  //@ts-expect-error
  await chrome.offscreen.createDocument({
    url: chrome.runtime.getURL('checkIp.html'),
    //@ts-expect-error
    reasons: [chrome.offscreen.Reason.IFRAME_SCRIPTING],
    justification: 'reason for needing the document',
  })

  if (state[1].workingApi) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const res = await fetch(
      `https://checkip.${
        process.env.NODE_ENV !== 'production' ? 'windscribe.com' : state[1].workingApi
      }`,
      {
        signal: controller.signal,
      },
    )
      .then(r => r.text())
      .catch(() => noIp)

    clearTimeout(timeoutId)

    //@ts-expect-error
    chrome.offscreen.closeDocument()

    return res
  }
  return noIp
}
