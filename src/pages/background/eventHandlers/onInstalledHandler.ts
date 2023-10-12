import { type StoreType } from 'state/store'
import { setFirstInstallDate } from 'state/slices/firstInstallDate'
import { addContextMenuItem } from 'services/contextMenu'

export function onInstalledHandler(bgStore: Promise<StoreType>) {
  return async (): Promise<void> => {
    const store = await bgStore
    const state = store.getState()
    if (!state.firstInstallDate) {
      store.dispatch(setFirstInstallDate(Date.now()))
    }
    if (!state.contextMenu) return
    addContextMenuItem()
  }
}
