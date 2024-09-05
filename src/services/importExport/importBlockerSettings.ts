import sendMessage from 'services/runtime/sendMessage'
import { setBlockLists } from 'state/slices/blocker'
import { AppDispatch } from 'state/store'
import { ImportedSettingsV1 } from 'utils/validators'

export const importBlockerSettings = (
  importedSettings: ImportedSettingsV1,
  dispatch: AppDispatch,
): void => {
  if (importedSettings.blockLists !== undefined && importedSettings.blockLists !== undefined) {
    dispatch(setBlockLists(importedSettings.blockLists))
    sendMessage({
      what: 'applyRulesets',
      from: 'popup',
      enabledRulesets: importedSettings.blockLists,
    })
  }
}
