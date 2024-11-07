import { type StoreType } from 'state/store'
import { setFirstInstallDate } from 'state/slices/firstInstallDate'
import { addContextMenuItem } from 'services/contextMenu'
import { runMigrationFromManifestV2ToV3 } from 'migrations/v2ToV3migration'
import { registerScripts } from './registerScripts'
import {
  serverListenerMiddleWareConfig,
  startListeningServerList,
} from 'state/serverListListenerMiddleware'
import { pushToDebugLog, sendDebugLog } from 'services/debugLog'
import { serializeError } from 'serialize-error'
import { recordInstall } from 'api/endpoints'

export function onInstalledHandler(bgStore: Promise<StoreType>) {
  return async (details: chrome.runtime.InstalledDetails): Promise<void> => {
    const store = await bgStore
    const state = store.getState()
    if (!state.firstInstallDate) {
      store.dispatch(setFirstInstallDate(Date.now()))
    }

    // TODO: Add browser type to the query string for firefox
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      pushToDebugLog({ message: 'Recording install for chrome', tag: 'background' })
      recordInstall(store.dispatch)
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

    const updatedState = store.getState()
    try {
      if (
        updatedState.session?.sessionData?.session_auth_hash &&
        updatedState.session?.sessionData?.username
      ) {
        await sendDebugLog(
          store.dispatch,
          updatedState.session?.sessionData?.session_auth_hash,
          updatedState.session?.sessionData?.username,
          updatedState,
        )
      }
    } catch (err) {
      pushToDebugLog({
        message: 'sending debug log with migration report failed',
        data: serializeError(err),
      })
    }

    if (!updatedState.contextMenu) return

    addContextMenuItem()
  }
}
