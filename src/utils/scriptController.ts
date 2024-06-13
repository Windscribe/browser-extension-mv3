import { pushToDebugLog } from 'services/debugLog'
import getErrorMessage from './getErrorMessage'

const matches: string[] = ['<all_urls>']
const excludeMatches: string[] = [
  'chrome://*',
  'https://chrome.google.com/webstore/category/extensions',
  'devtools://*',
]

async function registerScript(scriptId: string, jsFileNames: string[]): Promise<void> {
  try {
    if ((await chrome.scripting.getRegisteredContentScripts({ ids: [scriptId] })).length > 0) {
      await pushToDebugLog({
        message: `unregistering script with id ${scriptId}`,
        tag: 'popup',
      })

      await unregisterScript(scriptId)
    }

    await chrome.scripting.registerContentScripts([
      {
        id: scriptId,
        world: 'MAIN',
        runAt: 'document_start',
        persistAcrossSessions: true,
        js: jsFileNames,
        matches,
        excludeMatches,
      },
    ])

    await pushToDebugLog({
      message: `registered script with id ${scriptId}`,
      tag: 'popup',
    })
  } catch (err) {
    const message = getErrorMessage(err)
    await pushToDebugLog({
      message,
      tag: 'popup',
      level: 'ERROR',
      data: JSON.stringify(err),
    })
  }
}

async function unregisterScript(id: string): Promise<void> {
  try {
    await chrome.scripting.unregisterContentScripts({
      ids: [id],
    })
  } catch (err) {
    const message = getErrorMessage(err)
    await pushToDebugLog({
      message,
      tag: 'popup',
      level: 'ERROR',
      data: JSON.stringify(err),
    })
  }
}

export { unregisterScript, registerScript }
