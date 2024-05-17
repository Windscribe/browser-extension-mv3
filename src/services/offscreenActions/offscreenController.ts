import { pushToDebugLog } from 'services/debugLog'

// the null and declare is due to https://github.com/microsoft/TypeScript/issues/14877#issuecomment-493729050
export default null
declare let self: ServiceWorkerGlobalScope

async function hasOffscreenDocument(path: string) {
  if ('getContexts' in chrome.runtime) {
    const contexts = await chrome.runtime.getContexts({
      contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
      documentUrls: [path],
    })
    return Boolean(contexts.length)
  } else {
    const matchedClients = await self.clients.matchAll()
    return await matchedClients.some(client => {
      client.url.includes(chrome.runtime.id)
    })
  }
}

// A global promise to avoid concurrency issues
let creating: Promise<void> | null

async function setupOffscreenDocument(
  path: string,
  reasons: chrome.offscreen.Reason[],
): Promise<void> {
  const offscreenDocumentExists = await hasOffscreenDocument(path)

  if (offscreenDocumentExists) {
    await pushToDebugLog({
      level: 'INFO',
      message: `Offscreen document already exists.`,
      tag: 'background',
    })
    return
  }

  // create offscreen document
  if (creating) {
    await creating
  } else {
    creating = chrome.offscreen.createDocument({
      url: path,
      reasons,
      justification: 'To migrate settings',
    })
    await creating
    creating = null
  }

  await pushToDebugLog({
    level: 'INFO',
    message: `Setup offscreen document with path ${path}`,
    tag: 'background',
  })
}

// not necessary but leaving in place for debugging purposes
// async function closeOffscreenDocument(path: string): Promise<void> {
//   if (!(await hasOffscreenDocument(path))) {
//     return
//   }
//   await pushToDebugLog({
//     level: 'INFO',
//     message: `Closing offscreen document ${path}`,
//     tag: 'background',
//   })
//   await chrome.offscreen.closeDocument()
// }

export { setupOffscreenDocument }
