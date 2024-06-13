import { type StoreType } from 'state/store'
import { setFirstInstallDate } from 'state/slices/firstInstallDate'
import { addContextMenuItem } from 'services/contextMenu'
import { runMigrationFromManifestV2ToV3 } from 'migrations/v2ToV3migration'
import { registerScripts } from './registerScripts'

export function onInstalledHandler(bgStore: Promise<StoreType>) {
  return async (): Promise<void> => {
    const store = await bgStore
    const state = store.getState()
    if (!state.firstInstallDate) {
      store.dispatch(setFirstInstallDate(Date.now()))
    }

    await runMigrationFromManifestV2ToV3(store)
    /* https://groups.google.com/a/chromium.org/g/chromium-extensions/c/ZM0Vzb_vuIs/m/acTHqizZAQAJ

    dynamicaly registerd scripts are unloaded on each update, we have to manually tell chrome
    to re-register the scripts

    */
    await registerScripts(store)

    if (!state.contextMenu) return

    addContextMenuItem()
  }
}
