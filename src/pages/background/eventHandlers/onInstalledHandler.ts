import { type StoreType } from 'state/store'
import { setFirstInstallDate } from 'state/slices/firstInstallDate'
import { addContextMenuItem } from 'services/contextMenu'
import { runMigrationFromManifestV2ToV3 } from 'migrations/v2ToV3migration'
import { registerScripts } from './registerScripts'
import {
  serverListenerMiddleWareConfig,
  startListeningServerList,
} from 'state/serverListListenerMiddleware'
import { MIGRATION_ID_V2_TO_V3 } from 'utils/constants'

export function onInstalledHandler(bgStore: Promise<StoreType>) {
  return async (details: chrome.runtime.InstalledDetails): Promise<void> => {
    const store = await bgStore
    const state = store.getState()
    if (!state.firstInstallDate) {
      store.dispatch(setFirstInstallDate(Date.now()))
    }

    const res = await runMigrationFromManifestV2ToV3(store, details)
    /* 
      Dynamicaly registered scripts are unloaded on each update, we have to re-register each time after updates/install
      https://groups.google.com/a/chromium.org/g/chromium-extensions/c/ZM0Vzb_vuIs/m/acTHqizZAQAJ
    */

    // only start listener if we migrated from mv2 to mv3
    if (res) {
      startListeningServerList(serverListenerMiddleWareConfig)
    }

    await registerScripts(store, res)

    if (!state.contextMenu) return

    addContextMenuItem()
  }
}
