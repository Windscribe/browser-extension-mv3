import { SHA256 } from 'crypto-js'
import { pushToDebugLog } from 'services/debugLog'
import { StoreType } from 'state'
import { FETCH_USER_AGENTS_LIST, setOriginalUserAgent } from 'state/slices/userAgent'
import {
  locationWarpScriptId,
  splitPersonalityScriptId,
  workerBlockScriptId,
} from 'utils/constants'
import { registerScript } from 'utils/scriptController'

const registerScripts = async (
  store: StoreType,
  isSuccessfulMigration: boolean | void = false,
): Promise<void> => {
  if (isSuccessfulMigration) {
    /* 
        This is right after migration, if user is logged in we fetch their data because we need 
        it to register the spoofing scripts otherwise a user would be migrated, with their privacy 
        settings active, but with no scripts being registered until they open the extension this condition 
        fixes that edge case, and we dispatch calls to get data. There is a listener middleware that listens and runs a side effect if we have the required data, the side effect is registering the scripts see src/state/scriptListenerMiddleware.ts as an example, this listener only works for register the scripts on migration
        
     */

    const session = store.getState().session.sessionData?.session_auth_hash
    const isWorkerBlockActive = store.getState().workerBlock
    const isSplitPersonalityEnabled = store.getState().splitPersonalityEnabled
    const userAgentOriginal = store.getState().userAgent.original
    const userAgentLoading = store.getState().userAgent.loading

    if (!session) {
      await pushToDebugLog({
        message: 'User is not logged in cannot register scripts - migration update',
        tag: 'background',
      })
      return
    }
    const excludeMatchesFromAllowList = Object.entries(store.getState().allowlist)
      .filter(([, value]) => {
        return value.allowPrivacyFeatures
      })
      // https or http and
      .map(([domainKey]) => `*://${domainKey}/*`)

    // worker block does not need data so we register here directly
    if (isWorkerBlockActive) {
      await registerScript(
        workerBlockScriptId,
        ['workerBlockContentScript.bundle.js'],
        excludeMatchesFromAllowList,
      )
    }

    if (!userAgentOriginal) {
      store.dispatch(setOriginalUserAgent(navigator.userAgent))
    }

    // only need to make the request if the setting is active
    if (userAgentLoading === 'idle' && isSplitPersonalityEnabled) {
      store.dispatch({ type: `alias/${FETCH_USER_AGENTS_LIST}` })
    }

    console.log('migration')
  } else {
    console.log('regular ')
    /*  
        This was a regular update and not a migration update
        assuming the user is logged in we register the scripts
        Note: if they are not logged in we do nothing, dont want to activate spoofing scripts without a user
        logging into the extension. If they have settings that are active, when the user logs back in
        the listener middleware and initializer hooks will register the scripts
     */

    const session = store.getState().session.sessionData?.session_auth_hash
    if (!session) {
      await pushToDebugLog({
        message: 'User is not logged in cannot register scripts - regular update',
        tag: 'background',
      })
      return
    }

    const isWorkerBlockActive = store.getState().workerBlock
    const isSplitPersonalityEnabled = store.getState().splitPersonalityEnabled
    const spoofedUserAgent = store.getState().userAgent.spoofed
    const isLocationWarpActive = store.getState().locationWarp
    const proxy = store.getState().proxy
    const autopilot = store.getState().autopilot
    const currentDataCenter = store.getState().currentDataCenter
    const dataCenterId = currentDataCenter.id

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

    if (isSplitPersonalityEnabled && spoofedUserAgent) {
      await registerScript(
        splitPersonalityScriptId,
        [SHA256(spoofedUserAgent).toString() + '.bundle.js'],
        excludeMatchesFromAllowList,
      )
    }

    if (
      proxy.status === 'on' &&
      !autopilot.autopilotSelected &&
      dataCenterId !== undefined &&
      dataCenterId !== null &&
      isLocationWarpActive
    ) {
      await registerScript(
        locationWarpScriptId,
        [SHA256(dataCenterId.toString()) + '.bundle.js'],
        excludeMatchesFromAllowList,
      )
    }

    await pushToDebugLog({
      message: 'registered scripts on install/update',
      tag: 'background',
    })
  }
}

export { registerScripts }
