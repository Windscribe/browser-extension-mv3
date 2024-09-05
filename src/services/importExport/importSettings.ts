import { pushToDebugLog } from 'services/debugLog'
import getErrorMessage from 'utils/getErrorMessage'
import { SettingsImportFormatValidatorVersion1 } from 'utils/validators'
import { FavoriteLocationsState } from 'state/slices/favoriteLocations'
import { DataCenter, ServerList } from 'api/types'
import { AllowlistState } from 'state/slices/allowlist'
import { AddToAllowlist } from 'components/hooks/useManageAllowlist'
import { AppDispatch } from 'state'
import { importOtherSettings } from './importOtherSorting'
import { importGeneralSettings } from './importGeneralSettings'
import { importConnectionSettings } from './importConnectionSettings'
import { importBlockerSettings } from './importBlockerSettings'
import { importAllowListSettings } from './importAllowlistSettings'
import { importPrivacySettings } from './importPrivacySettings'

type ImportSettingsArgs = {
  file: File
  serverList: ServerList
  existingAllowList: AllowlistState
  addToAllowlist: AddToAllowlist
  favoriteLocations: FavoriteLocationsState
  dispatch: AppDispatch
  locationId: number | undefined
  currentDataCenter: Partial<DataCenter>
  autopilotSelected: boolean
  isUserPro: 0 | 1 | undefined
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
}: ImportSettingsArgs): Promise<void> => {
  try {
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

      importBlockerSettings(importedSettings, dispatch)

      importOtherSettings(importedSettings, serverList, favoriteLocations, dispatch)

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

      await importAllowListSettings(importedSettings, addToAllowlist)

      await pushToDebugLog({
        message: 'imported settings',
      })
    } else {
      await pushToDebugLog({
        level: 'ERROR',
        message: `Could not validate settings`,
        tag: 'popup',
        data: JSON.stringify(parsedSettings.error),
      })
    }
  } catch (err) {
    const message = getErrorMessage(err)
    await pushToDebugLog({
      message: message,
      level: 'ERROR',
    })
  }
}
