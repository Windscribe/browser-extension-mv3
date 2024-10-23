import { StoreType } from 'state'
import { addPermissions, removePermissions } from 'state/slices/permissions'
import { CONTENT_SETTINGS } from 'utils/constants'

export function handlePermissionsAdded(bgStore: Promise<StoreType>) {
  return async (permissions: chrome.permissions.Permissions): Promise<void> => {
    const store = await bgStore
    if (permissions.permissions?.includes(CONTENT_SETTINGS)) {
      store.dispatch(addPermissions([CONTENT_SETTINGS]))
    }
  }
}

export function handlePermissionsRemoved(bgStore: Promise<StoreType>) {
  return async (permissions: chrome.permissions.Permissions): Promise<void> => {
    const store = await bgStore
    if (permissions.permissions?.includes(CONTENT_SETTINGS)) {
      store.dispatch(removePermissions([CONTENT_SETTINGS]))
    }
  }
}
