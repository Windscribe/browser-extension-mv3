import { type StoreType } from 'state/store'
import { setFirstInstallDate } from 'state/slices/firstInstallDate'
import { addContextMenuItem } from 'services/contextMenu'

export function onInstalledHandler(bgStore: Promise<StoreType>) {
  return async (): Promise<void> => {
    const store = await bgStore
    store.dispatch(setFirstInstallDate(Date.now()))
    if (!store.getState().contextMenu) return
    addContextMenuItem()
  }
}
