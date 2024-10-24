import { StoreType } from 'state'
import { removeOverlay } from 'state/slices/overlay'
import { addPermissions, removePermissions } from 'state/slices/permissions'
import { CONTENT_SETTINGS } from 'utils/constants'

export function handlePermissionsAdded(bgStore: Promise<StoreType>) {
  return async (permissions: chrome.permissions.Permissions): Promise<void> => {
    const store = await bgStore
    if (permissions.permissions?.includes(CONTENT_SETTINGS)) {
      store.dispatch(addPermissions([CONTENT_SETTINGS]))
      // close it here since the native modal closes the popup
      store.dispatch(removeOverlay('notificationBlockerPermission'))
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
