import { DataCenter, ServerList } from 'api/types'
import { AddToAllowlistType } from 'components/hooks/useManageAllowlist'
import { SHA256 } from 'crypto-js'
import { pushToDebugLog } from 'services/debugLog'
import { AppDispatch } from 'state'
import { setAdPrivacyEnabled } from 'state/slices/adPrivacyEnabled'
import { AllowlistState } from 'state/slices/allowlist'
import { setLanguageWarpEnabled } from 'state/slices/languageWarpEnabled'
import { setLocationWarp } from 'state/slices/locationWarp'
import {
  enableBlockNotifications,
  resetNotificationBlocker,
  setNotificationBlockerEnabled,
} from 'state/slices/notificationBlockerEnabled'
import {
  activateSplitPersonality,
  deactivateSplitPersonality,
  setSplitPersonalityEnabled,
} from 'state/slices/splitPersonalityEnabled'
import { setTimeWarpEnabled } from 'state/slices/timeWarpEnabled'
import { enableBlockWebRtc, resetWebRtcBlocker, setWebRtcEnabled } from 'state/slices/webRtcEnabled'
import { setWorkerBlock } from 'state/slices/workerBlock'
import {
  languageWarpScriptId,
  locationWarpScriptId,
  timeZoneWarpScriptId,
  workerBlockScriptId,
} from 'utils/constants'
import { getBundleNamePostFix } from 'utils/getBundleName'
import { getNearestValidDataCenter } from 'utils/getNearestValidLocation'
import { doesBundleExistInBuild, registerScript, unregisterScript } from 'utils/scriptController'
import transformAllowListToExcludeMatches from 'utils/transformAllowListToExcludeMatches'
import { ImportedSettingsV1 } from 'utils/validators'

type ImportPrivacySettingsArgs = {
  importedSettings: ImportedSettingsV1
  locationId: number | undefined
  currentDataCenter: Partial<DataCenter>
  autopilotSelected: boolean
  isUserPro: 0 | 1 | undefined
  serverList: ServerList
  existingAllowList: AllowlistState
  dispatch: AppDispatch
  addToAllowlist: AddToAllowlistType
}

type ImportLocationWarpArgs = Pick<
  ImportPrivacySettingsArgs,
  | 'importedSettings'
  | 'existingAllowList'
  | 'serverList'
  | 'autopilotSelected'
  | 'isUserPro'
  | 'dispatch'
  | 'currentDataCenter'
>

type ImportLanguageWarpArgs = Pick<
  ImportPrivacySettingsArgs,
  'importedSettings' | 'existingAllowList' | 'autopilotSelected' | 'locationId' | 'dispatch'
>

type ImportTimeZoneWarpArgs = ImportLanguageWarpArgs

const activateLocationWarp = async ({
  autopilotSelected,
  importedSettings,
  existingAllowList,
  isUserPro,
  serverList,
  currentDataCenter,
  dispatch,
}: ImportLocationWarpArgs) => {
  if (importedSettings.locationWarp !== undefined && importedSettings.locationWarp !== null) {
    await dispatch(setLocationWarp(importedSettings.locationWarp))
    const dataCenterId = currentDataCenter.id

    if (autopilotSelected) return
    if (dataCenterId === undefined || dataCenterId === null) return

    const excludeMatchesFromAllowList = transformAllowListToExcludeMatches(existingAllowList)

    if (importedSettings.locationWarp) {
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
    } else {
      await unregisterScript(locationWarpScriptId)
    }
  }
}

const activateLanguageWarp = async ({
  autopilotSelected,
  importedSettings,
  existingAllowList,
  locationId,
  dispatch,
}: ImportLanguageWarpArgs) => {
  if (
    importedSettings.languageWarpEnabled !== undefined &&
    importedSettings.languageWarpEnabled !== null
  ) {
    await dispatch(setLanguageWarpEnabled(importedSettings.languageWarpEnabled))

    if (autopilotSelected) return
    if (locationId === undefined || locationId === null) return

    const excludeMatchesFromAllowList = transformAllowListToExcludeMatches(existingAllowList)

    if (importedSettings.languageWarpEnabled) {
      await registerScript(
        languageWarpScriptId,
        [SHA256(locationId.toString()) + getBundleNamePostFix('languageWarpScript') + '.bundle.js'],
        excludeMatchesFromAllowList,
      )
    } else {
      await unregisterScript(languageWarpScriptId)
    }
  }
}

const activateTimeZoneWarp = async ({
  autopilotSelected,
  importedSettings,
  existingAllowList,
  locationId,
  dispatch,
}: ImportTimeZoneWarpArgs) => {
  if (importedSettings.timeWarpEnabled !== undefined && importedSettings.timeWarpEnabled !== null) {
    await dispatch(setTimeWarpEnabled(importedSettings.timeWarpEnabled))

    if (autopilotSelected) return
    if (locationId === undefined || locationId === null) return

    const excludeMatchesFromAllowList = transformAllowListToExcludeMatches(existingAllowList)

    if (importedSettings.timeWarpEnabled) {
      await registerScript(
        timeZoneWarpScriptId,
        [SHA256(locationId.toString()) + getBundleNamePostFix('timeZoneWarpScript') + '.bundle.js'],
        excludeMatchesFromAllowList,
      )
    } else {
      await unregisterScript(timeZoneWarpScriptId)
    }
  }
}

export const importPrivacySettings = async ({
  autopilotSelected,
  currentDataCenter,
  importedSettings,
  isUserPro,
  locationId,
  existingAllowList,
  serverList,
  dispatch,
}: ImportPrivacySettingsArgs): Promise<void> => {
  await activateLocationWarp({
    autopilotSelected,
    currentDataCenter,
    existingAllowList,
    importedSettings,
    isUserPro,
    serverList,
    dispatch,
  })

  await activateLanguageWarp({
    autopilotSelected,
    existingAllowList,
    importedSettings,
    locationId,
    dispatch,
  })

  await activateTimeZoneWarp({
    autopilotSelected,
    existingAllowList,
    importedSettings,
    locationId,
    dispatch,
  })

  if (
    importedSettings.splitPersonalityEnabled !== undefined &&
    importedSettings.splitPersonalityEnabled !== null
  ) {
    dispatch(setSplitPersonalityEnabled(importedSettings.splitPersonalityEnabled))

    if (importedSettings.splitPersonalityEnabled) {
      await dispatch(activateSplitPersonality())
    } else {
      await dispatch(deactivateSplitPersonality())
    }
  }

  if (importedSettings.webRtcEnabled !== undefined && importedSettings.webRtcEnabled !== null) {
    dispatch(setWebRtcEnabled(importedSettings.webRtcEnabled))

    if (importedSettings.webRtcEnabled) {
      await dispatch(enableBlockWebRtc())
    } else {
      await dispatch(resetWebRtcBlocker())
    }
  }

  if (importedSettings.workerBlock !== undefined && importedSettings.workerBlock !== null) {
    dispatch(setWorkerBlock(importedSettings.workerBlock))

    const excludeMatchesFromExistingAllowList =
      transformAllowListToExcludeMatches(existingAllowList)

    if (importedSettings.workerBlock) {
      await registerScript(
        workerBlockScriptId,
        ['workerBlockContentScript.bundle.js'],
        excludeMatchesFromExistingAllowList,
      )
    } else {
      await unregisterScript(workerBlockScriptId)
    }
  }

  if (
    importedSettings.notificationBlockerEnabled !== undefined &&
    importedSettings.notificationBlockerEnabled !== null
  ) {
    dispatch(setNotificationBlockerEnabled(importedSettings.notificationBlockerEnabled))

    if (importedSettings.notificationBlockerEnabled) {
      await dispatch(enableBlockNotifications())
    } else {
      await dispatch(resetNotificationBlocker())
    }
  }

  if (
    importedSettings.adPrivacyEnabled !== undefined &&
    importedSettings.adPrivacyEnabled !== null
  ) {
    dispatch(setAdPrivacyEnabled(importedSettings.adPrivacyEnabled))
  }
}
