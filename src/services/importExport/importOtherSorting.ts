import { ServerList } from 'api/types'
import { addLocationToFavorite, FavoriteLocationsState } from 'state/slices/favoriteLocations'
import { setLocationSorting } from 'state/slices/locationSorting'
import { setTheme } from 'state/slices/theme'
import { AppDispatch } from 'state/store'
import { ImportedSettingsV1 } from 'utils/validators'

// location sorting, favourite locations and theme
export const importOtherSettings = (
  importedSettings: ImportedSettingsV1,
  serverList: ServerList,
  favoriteLocations: FavoriteLocationsState,
  dispatch: AppDispatch,
): void => {
  if (importedSettings.locationSorting !== undefined && importedSettings.locationSorting !== null) {
    dispatch(setLocationSorting(importedSettings.locationSorting))
  }

  if (importedSettings.theme !== undefined && importedSettings.theme !== null) {
    dispatch(setTheme(importedSettings.theme))
  }

  if (
    importedSettings.favoriteLocations !== undefined &&
    importedSettings.favoriteLocations !== null
  ) {
    if (serverList && serverList.length > 0) {
      const existingIds = favoriteLocations
        .map(i => i.id)
        .filter(id => id !== undefined && id !== null)

      const dataCentersToAdd = serverList
        .map(i => i.groups)
        .flat(1)
        .filter(dataCenter => {
          if (!dataCenter?.id) {
            return false
          }

          return importedSettings.favoriteLocations?.includes(dataCenter.id)
        })
        .filter(dataCenter => !!dataCenter)

      for (const dataCenter of dataCentersToAdd) {
        if (dataCenter && !existingIds.includes(dataCenter.id)) {
          dispatch(addLocationToFavorite(dataCenter))
        }
      }
    }
  }
}
