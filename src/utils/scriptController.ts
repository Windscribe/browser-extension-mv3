import { pushToDebugLog } from 'services/debugLog'
import getErrorMessage from './getErrorMessage'

const matches: string[] = ['<all_urls>']
// no devtools:// or chrome:// as these are not valid url schemes
const excludeMatches: string[] = ['https://chrome.google.com/webstore/category/extensions']

async function registerScript(scriptId: string, jsFileNames: string[]): Promise<void> {
  try {
    if ((await chrome.scripting.getRegisteredContentScripts({ ids: [scriptId] })).length > 0) {
      await pushToDebugLog({
        message: `unregistering script with id ${scriptId}`,
        tag: 'popup',
      })

      await unregisterScript(scriptId)
    }

    const res = await chrome.scripting.registerContentScripts([
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
      data: JSON.stringify(res),
    })
  } catch (err) {
    const message = getErrorMessage(err)
    await pushToDebugLog({
      message,
      tag: 'popup',
      level: 'ERROR',
      data: JSON.stringify(err),
    })
    console.log(err)
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
    console.log(err)
  }
}

export { unregisterScript, registerScript }
