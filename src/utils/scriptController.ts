import { pushToDebugLog } from 'services/debugLog'
import getErrorMessage from './getErrorMessage'

const matches: string[] = ['<all_urls>']
// no devtools:// or chrome:// as these are not valid url schemes
const excludeMatches: string[] = ['https://chrome.google.com/webstore/category/extensions']

async function registerScript(
  scriptId: string,
  jsFileNames: string[],
  excludeDomains?: string[],
): Promise<void> {
  try {
    if ((await chrome.scripting.getRegisteredContentScripts({ ids: [scriptId] })).length > 0) {
      await unregisterScript(scriptId)
      await pushToDebugLog({
        message: `unregistered script with id ${scriptId}`,
        tag: 'popup',
      })
    }

    let exclusions = [...excludeMatches]
    if (excludeDomains) {
      exclusions = [...exclusions, ...excludeDomains]
    }

    const res = await chrome.scripting.registerContentScripts([
      {
        id: scriptId,
        world: 'MAIN',
        runAt: 'document_start',
        persistAcrossSessions: true,
        js: jsFileNames,
        matches,
        allFrames: true,
        excludeMatches: exclusions,
      },
    ])

    await pushToDebugLog({
      message: `registered script with id ${scriptId}`,
      tag: 'popup',
      data: JSON.stringify({
        res,
        scriptId,
        jsFileNames,
        excludeDomains,
      }),
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

/** This can potentially wipe existing script config for the script id you pass,
 *  any property you change is replaced for the particular script with with passed in script id.
 *  To keep your old properties you will need to find the script with the id you want using code like this
 *
 * `const matchingScript = await getScriptForId(scriptId)`
 *
 *  Then keep or remove what you want and then call `updateScript` with the updated script
 *
 */
async function updateScript(script: chrome.scripting.RegisteredContentScript): Promise<void> {
  try {
    await chrome.scripting.updateContentScripts([script])

    await pushToDebugLog({
      message: `Updated script with id ${script.id}`,
      tag: 'popup',
      data: JSON.stringify({
        script,
      }),
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

    await pushToDebugLog({
      message: `Unregistered script with id ${id}`,
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

async function getScriptForId(
  id: string,
): Promise<chrome.scripting.RegisteredContentScript | undefined> {
  return (await chrome.scripting.getRegisteredContentScripts()).find(script => script.id === id)
}

function toExcludeMatchesURL(domain: string): string {
  return `*://${domain}/*`
}

export { unregisterScript, registerScript, updateScript, getScriptForId, toExcludeMatchesURL }
