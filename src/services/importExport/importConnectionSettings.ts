import { setSmokeWall, setFailover, setAutoConnect } from 'state/slices/connection'
import { setProxyPort } from 'state/slices/proxyPort'
import { AppDispatch } from 'state/store'
import { ImportedSettingsV1 } from 'utils/validators'

export const importConnectionSettings = (
  importedSettings: ImportedSettingsV1,
  dispatch: AppDispatch,
): void => {
  if (importedSettings.proxyPort !== undefined && importedSettings.proxyPort !== null) {
    dispatch(setProxyPort(importedSettings.proxyPort))
  }

  if (
    importedSettings.connectionState?.smokeWall !== undefined &&
    importedSettings.connectionState !== null
  ) {
    dispatch(setSmokeWall(importedSettings.connectionState.smokeWall))
  }

  if (
    importedSettings.connectionState?.failover !== undefined &&
    importedSettings.connectionState?.failover !== null
  ) {
    dispatch(setFailover(importedSettings.connectionState.failover))
  }

  if (
    importedSettings.connectionState?.autoConnect !== undefined &&
    importedSettings.connectionState?.autoConnect !== null
  ) {
    dispatch(setAutoConnect(importedSettings.connectionState.autoConnect))
  }
}
