import { Message } from 'api/types'
import { type StoreType } from 'state/store'
import { UBLOCK_LITE_EXTENSION_IDS } from 'utils/constants'

export function ublockStatusChangeHandler(bgStore: Promise<StoreType>) {
  return async (info: chrome.management.ExtensionInfo): Promise<void> => {
    // if the extension id is in the list of ublock lite extension ids
    // TODO: update for firefox
    if (UBLOCK_LITE_EXTENSION_IDS.find(id => id === info.id)) {
      const store = await bgStore

      const authHash = store.getState().session.sessionData?.session_auth_hash
      if (!authHash) {
        ;(await chrome.runtime.sendMessage)<Message>({
          target: 'offscreen',
          type: 'applyBlockerSettings',
          data: [],
        })
        return
      }

      const blockLists = store.getState().blocker.blockLists
      if (info.enabled) {
        // disable our ublock settings since external ublock is enabled
        ;(await chrome.runtime.sendMessage)<Message>({
          target: 'offscreen',
          type: 'applyBlockerSettings',
          data: [],
        })
      } else {
        // reenable our ublock settings since external ublock is disabled
        ;(await chrome.runtime.sendMessage)<Message>({
          target: 'offscreen',
          type: 'applyBlockerSettings',
          data: blockLists,
        })
      }
    }
  }
}
