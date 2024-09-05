import { SHA256 } from 'crypto-js'
import { pushToDebugLog } from 'services/debugLog'
import { StoreType } from 'state'
import { FETCH_BEST_LOCATION } from 'state/slices/bestLocation'
import { FETCH_SERVER_CREDENTIALS } from 'state/slices/serverCredentials'
import { FETCH_SERVER_LIST } from 'state/slices/servers'
import { FETCH_USER_AGENTS_LIST, setOriginalUserAgent } from 'state/slices/userAgent'
import {
  languageWarpScriptId,
  locationWarpScriptId,
  splitPersonalityScriptId,
  timeZoneWarpScriptId,
  workerBlockScriptId,
} from 'utils/constants'
import { getBundleNamePostFix } from 'utils/getBundleName'
import { getNearestValidDataCenter } from 'utils/getNearestValidLocation'
import { doesBundleExistInBuild, registerScript } from 'utils/scriptController'

import transformAllowListToExcludeMatches from 'utils/transformAllowListToExcludeMatches'

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
    const serverListLoading = store.getState().servers.loading
    const username = store.getState().serverCredentials.username
    const password = store.getState().serverCredentials.password
    const bestLocationLoading = store.getState().bestLocation.loading

    if (!session) {
      await pushToDebugLog({
        message: 'User is not logged in cannot register scripts - migration update',
        tag: 'background',
      })
      return
    }

    const excludeMatchesFromAllowList = transformAllowListToExcludeMatches(
      store.getState().allowlist,
    )

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

    if (!(username && password)) {
      store.dispatch({ type: `alias/${FETCH_SERVER_CREDENTIALS}` })
    }

    if (serverListLoading === 'idle') {
      store.dispatch({ type: `alias/${FETCH_SERVER_LIST}` })
    }

    if (bestLocationLoading === 'idle') {
      store.dispatch({ type: `alias/${FETCH_BEST_LOCATION}` })
    }

    await pushToDebugLog({
      message: 'registerScripts run - migration update',
      tag: 'background',
    })
  } else {
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
    const isLanguageWarpActive = store.getState().languageWarpEnabled
    const currentLocation = store.getState().currentLocation
    const isTimeZoneWarpActive = store.getState().timeWarpEnabled
    const serverList = store.getState().servers.serverList
    const isUserPro = store.getState().session.sessionData?.is_premium

    const excludeMatchesFromAllowList = transformAllowListToExcludeMatches(
      store.getState().allowlist,
    )

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
      !autopilot.autopilotSelected &&
      dataCenterId !== undefined &&
      dataCenterId !== null &&
      isLocationWarpActive
    ) {
      const bundleFileName =
        SHA256(dataCenterId.toString()) + getBundleNamePostFix('locationWarpScript') + '.bundle.js'

      const bundleExists = await doesBundleExistInBuild(bundleFileName)

      if (bundleExists) {
        await registerScript(locationWarpScriptId, [bundleFileName], excludeMatchesFromAllowList)
      } else {
        const possibleNearestDataCenterId = await getNearestValidDataCenter(
          dataCenterId,
          serverList,
          currentDataCenter,
          isUserPro,
          'locationWarpScript',
        )

        if (possibleNearestDataCenterId !== undefined && possibleNearestDataCenterId !== null) {
          const bundleFileName =
            SHA256(possibleNearestDataCenterId.toString()) +
            getBundleNamePostFix('locationWarpScript') +
            '.bundle.js'

          await registerScript(locationWarpScriptId, [bundleFileName], excludeMatchesFromAllowList)
        } else {
          await pushToDebugLog({
            message: 'Could not find any fallback data center',
            tag: 'popup',
            level: 'ERROR',
          })
        }
      }
    }

    if (
      !autopilot.autopilotSelected &&
      currentLocation.id !== undefined &&
      currentLocation.id !== null &&
      isLanguageWarpActive
    ) {
      await registerScript(
        languageWarpScriptId,
        [
          SHA256(currentLocation.id.toString()) +
            getBundleNamePostFix('languageWarpScript') +
            '.bundle.js',
        ],
        excludeMatchesFromAllowList,
      )
    }

    if (
      !autopilot.autopilotSelected &&
      currentLocation.id !== undefined &&
      currentLocation.id !== null &&
      isTimeZoneWarpActive
    ) {
      await registerScript(
        timeZoneWarpScriptId,
        [
          SHA256(currentLocation.id.toString()) +
            getBundleNamePostFix('timeZoneWarpScript') +
            '.bundle.js',
        ],
        excludeMatchesFromAllowList,
      )
    }

    await pushToDebugLog({
      message: 'registerScripts run - regular update',
      tag: 'background',
    })
  }
}

export { registerScripts }
