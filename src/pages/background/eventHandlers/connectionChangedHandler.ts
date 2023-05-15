import { type StoreType } from 'state/store'
import { setIsOnline } from 'state/slices/isOnline'

export function connectionChangedHandler(bgStore: Promise<StoreType>) {
  return async (): Promise<void> => {
    const isOnline = self?.navigator?.onLine
    if (typeof isOnline !== 'boolean') return
    const store = await bgStore
    store.dispatch(setIsOnline(isOnline))
  }
}
