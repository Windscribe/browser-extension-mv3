import { type StoreType } from 'state/store'
import { setFirstInstallDate } from 'state/slices/firstInstallDate'
import { addContextMenuItem } from 'services/contextMenu'
import { runMigrationFromManifestV2ToV3 } from 'migrations/v2ToV3migration'
import { registerScripts } from './registerScripts'
import {
  serverListenerMiddleWareConfig,
  startListeningServerList,
} from 'state/serverListListenerMiddleware'

export function onInstalledHandler(bgStore: Promise<StoreType>) {
  return async (): Promise<void> => {
    const store = await bgStore
    const state = store.getState()
    if (!state.firstInstallDate) {
      store.dispatch(setFirstInstallDate(Date.now()))
    }

    const res = await runMigrationFromManifestV2ToV3(store)
    /* 
      Dynamicaly registered scripts are unloaded on each update, we have to re-register each time after updates/install
      https://groups.google.com/a/chromium.org/g/chromium-extensions/c/ZM0Vzb_vuIs/m/acTHqizZAQAJ
    */

    startListeningServerList(serverListenerMiddleWareConfig)

    await registerScripts(store, res)

    if (!state.contextMenu) return

    addContextMenuItem()
  }
}
