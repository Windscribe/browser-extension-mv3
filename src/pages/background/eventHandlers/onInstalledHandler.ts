import { type StoreType } from 'state/store'
import { setFirstInstallDate } from 'state/slices/firstInstallDate'
import { addContextMenuItem } from 'services/contextMenu'
import { runMigrationFromManifestV2ToV3 } from 'migrations/v2ToV3migration'
import { registerScripts } from './registerScripts'
import {
  serverListenerMiddleWareConfig,
  startListeningServerList,
} from 'state/serverListListenerMiddleware'
import { pushToDebugLog } from 'services/debugLog'
import { recordInstall } from 'api/endpoints'
import { setBlockLists } from 'state/slices/blocker'
import { enableOrDisableUblock } from 'services/detectUblock'

let installReason: chrome.runtime.OnInstalledReason | undefined

export const getInstallReason = (): chrome.runtime.OnInstalledReason | undefined => installReason

export function onInstalledHandler(bgStore: Promise<StoreType>) {
  return async (details: chrome.runtime.InstalledDetails): Promise<void> => {
    installReason = details.reason
    const store = await bgStore
    const state = store.getState()
    if (!state.firstInstallDate) {
      store.dispatch(setFirstInstallDate(Date.now()))
    }

    // reset the dismissedupgradewarning to false to show warning banner again, comment this out to not show the warning banner again in subsequent updates, basically we want to show the warning banner again in the next update for updating ublock to min version 122
    // if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    //   store.dispatch(setDismissedUpgradeWarning(false))
    // }

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

    if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
      const currentRunningVersion = chrome.runtime.getManifest().version
      const currentBlockList = store.getState().blocker.blockLists

      if (
        // 4.2.2 is for main && 4.3.3 is for experimental
        currentRunningVersion === '4.2.2' ||
        currentRunningVersion === '4.3.3'
      ) {
        // is on older block list version, set to new default block list

        // if off turn the new block list on anyway
        const newBlockList = [
          'easylist',
          'easyprivacy',
          'pgl',
          'ublock-filters',
          // keep evertyhing else except the older default list
          // if it exists
          ...currentBlockList.filter(list => list !== 'default'),
        ]

        // may already have the new default block list if user has upgraded

        const dedupedBlockList = Array.from(new Set(newBlockList))

        store.dispatch(setBlockLists(dedupedBlockList))

        await enableOrDisableUblock(dedupedBlockList, store)
      }
    }

    const updatedState = store.getState()

    if (!updatedState.contextMenu) return

    addContextMenuItem(updatedState.currentLanguage.currentLanguage)
  }
}
