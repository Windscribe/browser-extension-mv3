import { pushToDebugLog } from 'services/debugLog'

// the null and declare is due to https://github.com/microsoft/TypeScript/issues/14877#issuecomment-493729050
export default null
declare let self: ServiceWorkerGlobalScope

chrome.runtime.onMessage.addListener(handleMessages)

const OFFSCREEN_DOCUMENT_PATH = 'migrateTheme.html'

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

async function setupOffscreenDocument(path: string) {
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
      reasons: [chrome.offscreen.Reason.LOCAL_STORAGE],
      justification: 'To migrate theme from IndexedDB to Local storage',
    })
    await creating
    creating = null
  }
}

async function closeOffscreenDocument() {
  if (!(await hasOffscreenDocument(OFFSCREEN_DOCUMENT_PATH))) {
    return
  }
  await chrome.offscreen.closeDocument()
}

export async function migrateTheme(): Promise<void> {
  await pushToDebugLog({
    level: 'INFO',
    message: `Opening offscreen document`,
    tag: 'background',
  })

  await setupOffscreenDocument(OFFSCREEN_DOCUMENT_PATH)
}

async function handleMessages(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: any,
) {
  // Return early if this message isn't meant for the background script
  if (message.target !== 'background') {
    return
  }

  // Dispatch the message to an appropriate handler.
  switch (message.type) {
    case 'closeOffscreenDocument':
      await pushToDebugLog({
        level: 'INFO',
        message: `Closing offscreen document`,
        tag: 'background',
      })
      await closeOffscreenDocument()
      break
    default:
      console.warn(`Unexpected message type received: '${message.type}'.`)
  }
}
