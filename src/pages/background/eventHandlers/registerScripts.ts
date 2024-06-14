import { pushToDebugLog } from 'services/debugLog'
import { StoreType } from 'state'
import { workerBlockScriptId } from 'utils/constants'
import { registerScript } from 'utils/scriptController'

const registerScripts = async (store: StoreType): Promise<void> => {
  const isWorkerBlockActive = store.getState().workerBlock

  // We do not inject any spoofing script if this domain is in an allowlist.
  // So we convert allowlist entries into exclude matches
  const excludeMatchesFromAllowList = Object.entries(store.getState().allowlist)
    .filter(([, value]) => {
      return value.allowPrivacyFeatures
    })
    // https or http and
    .map(([domainKey]) => `*://${domainKey}/*`)

  if (isWorkerBlockActive) {
    await registerScript(
      workerBlockScriptId,
      ['workerBlockContentScript.bundle.js'],
      excludeMatchesFromAllowList,
    )
  }

  await pushToDebugLog({
    message: 'registered scripts on install/update',
    tag: 'background',
  })
}

export { registerScripts }
