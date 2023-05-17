// import browserApi from 'services/browserApi'

export default async function checkIp(workingApi: string): Promise<string> {
  // const state = await browserApi.getStateFromStorage()
  const noIp = '---.---.---.---'

  console.log('%c checkIp 0 workingApi:', 'background: #383E49; color: #1ADEAE', workingApi)

  // TODO Is it 2 different functions (ping nossl and checkIp)?
  // TODO Do we really need to create offscreen page every time every time  or just check if it has exist?
  try {
    //@ts-expect-error
    await chrome.offscreen.createDocument({
      url: chrome.runtime.getURL('checkIp.html'),
      //@ts-expect-error
      reasons: [chrome.offscreen.Reason.IFRAME_SCRIPTING],
      justification: '407 authentication',
    })
  } catch (err) {
    await closeOffscreen()
    console.log('%c checkIp createDocument() Error', 'background: #d83E49; color: #1ADEAE', err)
    throw new Error('Error while trying to chrome.offscreen.createDocument')
  }
  console.log('%c checkIp 1', 'background: #383E49; color: #1ADEAE')

  async function closeOffscreen() {
    try {
      //@ts-expect-error
      await chrome.offscreen.closeDocument()
    } catch (err) {
      console.log('%c checkIp closeDocument() Error', 'background: #d83E49; color: #1ADEAE', err)
      throw new Error('Error while trying to chrome.offscreen.closeDocument')
    }
  }

  if (!workingApi) {
    return noIp
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 3000)

  console.log('%c checkIp 2 ', 'background: #383E49; color: #1ADEAE')

  const res = await fetch(
    //TODO get url from constant.ts
    `https://checkip.${process.env.NODE_ENV !== 'production' ? 'windscribe.com' : workingApi}`,
    {
      signal: controller.signal,
    },
  )
    .then(r => r.text())
    .catch(e => {
      //TODO handle error
      // throw?
      console.log('fetch checkip Error', e)
      return noIp
    })

  clearTimeout(timeoutId)

  console.log('%c checkIp 3 res', 'background: #383E49; color: #1ADEAE', res)

  return res
}
