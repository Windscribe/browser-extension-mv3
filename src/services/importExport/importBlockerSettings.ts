import { detectUblock } from 'services/detectUblock'
import sendMessage from 'services/runtime/sendMessage'
import { setBlockLists } from 'state/slices/blocker'
import { AppDispatch } from 'state/store'
import { ImportedSettingsV1 } from 'utils/validators'

// side note: we dont import the setting if ublock is not installed or disabled since that
// is dynamically determined

export const importBlockerSettings = async (
  importedSettings: ImportedSettingsV1,
  dispatch: AppDispatch,
): Promise<void> => {
  if (importedSettings.blockLists !== undefined && importedSettings.blockLists !== undefined) {
    // take the imported blocklists but ...
    dispatch(setBlockLists(importedSettings.blockLists))
    // ... only enable ublock if ubolite is not active or not installed
    const ublockStatus = await detectUblock()
    if (ublockStatus === 'disabled' || ublockStatus === 'not_installed') {
      sendMessage({
        what: 'applyRulesets',
        from: 'popup',
        enabledRulesets: importedSettings.blockLists,
      })
    }
  }
}
