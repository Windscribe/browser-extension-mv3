import { pushToDebugLog } from 'services/debugLog'
import getErrorMessage from './getErrorMessage'
import { serializeError } from 'serialize-error'

const matches: string[] = ['<all_urls>']
// no devtools:// or chrome:// as these are not valid url schemes
const excludeMatches: string[] = ['https://chrome.google.com/webstore/category/extensions']

/**
 *  This is idempotent, running this again and again with the same args will unregister and
 *  re register this script, this is to protect against react hooks running multiple times.
 */
async function registerScript(
  scriptId: string,
  jsFileNames: string[],
  excludeDomains?: string[],
  world: 'MAIN' | 'ISOLATED' = 'MAIN',
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
        world,
        runAt: 'document_start',
        persistAcrossSessions: true,
        js: jsFileNames,
        matches,
        allFrames: true,
        excludeMatches: exclusions,
        matchOriginAsFallback: true,
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
      data: serializeError(err),
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
      data: serializeError(err),
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
      data: serializeError(err),
    })
  }
}

async function getScriptForId(
  id: string,
): Promise<chrome.scripting.RegisteredContentScript | undefined> {
  return (await chrome.scripting.getRegisteredContentScripts()).find(script => script.id === id)
}

// https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns
function toExcludeMatchesURL(domain: string, includeSubdomain = false): string {
  if (includeSubdomain) {
    const subdomain = domain.replace('www.', '')
    // matches eg: nytimes.com and cooking.nytimes.com i.e both the domain and its subdomains
    // the match pattern would then be  *://*.nytimes.com/*
    return `*://*.${subdomain}/*`
  }
  return `*://${domain}/*`
}

async function doesBundleExistInBuild(fileName: string): Promise<boolean> {
  try {
    const url = chrome.runtime.getURL(fileName)
    const response = await fetch(url)

    if (!response.ok) {
      await pushToDebugLog({
        level: 'WARN',
        tag: 'popup',
        message: `Fetch failed for bundle with ${fileName}: ${response.status} ${response.statusText}`,
      })

      return false
    }

    return true
  } catch (err) {
    await pushToDebugLog({
      level: 'ERROR',
      tag: 'popup',
      message: `Error fetching ${fileName}:`,
    })

    return false
  }
}

export {
  unregisterScript,
  registerScript,
  updateScript,
  getScriptForId,
  toExcludeMatchesURL,
  doesBundleExistInBuild,
}
