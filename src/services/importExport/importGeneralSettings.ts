import { setAllowSystemNotifications } from 'state/slices/allowSystemNotifications'
import { showDebugContextMenu } from 'state/slices/contextMenu'
import { setLocationLoad } from 'state/slices/locationLoad'
import { AppDispatch } from 'state/store'
import { ImportedSettingsV1 } from 'utils/validators'

export const importGeneralSettings = (
  importedSettings: ImportedSettingsV1,
  dispatch: AppDispatch,
): void => {
  if (importedSettings.contextMenu !== undefined && importedSettings.contextMenu !== null) {
    dispatch(showDebugContextMenu(importedSettings.contextMenu))
  }

  // DONE
  if (importedSettings.locationLoad !== undefined && importedSettings.locationLoad !== null) {
    dispatch(setLocationLoad(importedSettings.locationLoad))
  }
  //DONE
  if (
    importedSettings.allowSystemNotifications !== undefined &&
    importedSettings.allowSystemNotifications !== null
  ) {
    dispatch(setAllowSystemNotifications(importedSettings.allowSystemNotifications))
  }
}
