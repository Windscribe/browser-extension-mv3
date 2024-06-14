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
    console.log(err)
  }
}

async function getExcludeMatches(scriptId: string): Promise<string[] | undefined> {
  try {
    const matchingScript = (await chrome.scripting.getRegisteredContentScripts()).find(
      script => script.id === scriptId,
    )

    return matchingScript?.excludeMatches
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

async function updateExcludeMatches(scriptId: string, excludeMatches: string[]): Promise<void> {
  try {
    await chrome.scripting.updateContentScripts([
      {
        id: scriptId,
        excludeMatches,
      },
    ])
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

function toExcludeMatchesURL(domain: string): string {
  return `*://${domain}/*`
}

export {
  unregisterScript,
  registerScript,
  updateExcludeMatches,
  getExcludeMatches,
  toExcludeMatchesURL,
}
