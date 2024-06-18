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
      await pushToDebugLog({
        message: `unregistering script with id ${scriptId}`,
        tag: 'popup',
      })

      await unregisterScript(scriptId)
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
 *  all the properties are replaced for the particular script with with passed in script id.
 *  To keep your old properties you will need to find the script with the id you want using code like this
 *
 * `const matchingScript = await getScriptForId(scriptId)`
 *
 *  Then keep or remove what you want call `updateScript` with the updated script
 *
 *  see [getScriptForId](./#getScriptForId)
 *
 */
async function updateScript(script: chrome.scripting.RegisteredContentScript): Promise<void> {
  try {
    await chrome.scripting.updateContentScripts([script])
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

async function getScriptForId(
  id: string,
): Promise<chrome.scripting.RegisteredContentScript | undefined> {
  return (await chrome.scripting.getRegisteredContentScripts()).find(script => script.id === id)
}

function toExcludeMatchesURL(domain: string): string {
  return `*://${domain}/*`
}

export { unregisterScript, registerScript, updateScript, getScriptForId, toExcludeMatchesURL }
