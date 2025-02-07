import { pushToDebugLog } from 'services/debugLog'
import { SettingsImportFormatValidatorVersion1 } from 'utils/validators'
import { FavoriteLocationsState } from 'state/slices/favoriteLocations'
import { DataCenter, ServerList } from 'api/types'
import { AllowlistState } from 'state/slices/allowlist'
import { AddToAllowlistType } from 'components/hooks/useManageAllowlist'
import { AppDispatch } from 'state'
import { importOtherSettings } from './importOtherSorting'
import { importGeneralSettings } from './importGeneralSettings'
import { importConnectionSettings } from './importConnectionSettings'
import { importBlockerSettings } from './importBlockerSettings'
import { importAllowListSettings } from './importAllowlistSettings'
import { importPrivacySettings } from './importPrivacySettings'
import { addOverlay } from 'state/slices/overlay'

type ImportSettingsArgs = {
  file: File
  serverList: ServerList
  existingAllowList: AllowlistState
  addToAllowlist: AddToAllowlistType
  favoriteLocations: FavoriteLocationsState
  dispatch: AppDispatch
  locationId: number | undefined
  currentDataCenter: Partial<DataCenter>
  autopilotSelected: boolean
  isUserPro: 0 | 1 | undefined
  isSplitPersonalityEnabled: boolean
  spoofedUserAgent: string
}

export const importSettings = async ({
  file,
  serverList,
  existingAllowList,
  addToAllowlist,
  favoriteLocations,
  dispatch,
  locationId,
  currentDataCenter,
  autopilotSelected,
  isUserPro,
  isSplitPersonalityEnabled,
  spoofedUserAgent,
}: ImportSettingsArgs): Promise<void> => {
  const fileContents = await file.text()
  const parsedJSONFile = JSON.parse(fileContents)
  const parsedSettings = SettingsImportFormatValidatorVersion1.safeParse(parsedJSONFile)
  if (parsedSettings.success) {
    await pushToDebugLog({
      message: 'importing settings',
    })

    const importedSettings = parsedSettings.data.data

    importGeneralSettings(importedSettings, dispatch)

    importConnectionSettings(importedSettings, dispatch)

    importOtherSettings(importedSettings, serverList, favoriteLocations, dispatch)

    await importBlockerSettings(importedSettings, dispatch)

    await importPrivacySettings({
      addToAllowlist,
      autopilotSelected,
      currentDataCenter,
      dispatch,
      existingAllowList,
      importedSettings,
      isUserPro,
      locationId,
      serverList,
    })

    await importAllowListSettings(
      importedSettings,
      addToAllowlist,
      isSplitPersonalityEnabled,
      spoofedUserAgent,
    )

    await pushToDebugLog({
      message: 'imported settings',
      data: JSON.stringify(importedSettings),
    })
  } else {
    await dispatch(addOverlay('invalidFormat'))
    await pushToDebugLog({
      level: 'ERROR',
      message: `Could not validate settings`,
      tag: 'popup',
      data: JSON.stringify(parsedSettings.error),
    })
  }
}
