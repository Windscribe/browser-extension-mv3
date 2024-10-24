import { StoreType } from 'state'
import {
  enableBlockNotifications,
  resetNotificationBlocker,
} from 'state/slices/notificationBlockerEnabled'
import { removeOverlay } from 'state/slices/overlay'
import { addPermissions, removePermissions } from 'state/slices/permissions'
import { setShouldShowReloadAlert } from 'state/slices/reloadAlert'
import { CONTENT_SETTINGS } from 'utils/constants'

export function handlePermissionsAdded(bgStore: Promise<StoreType>) {
  return async (permissions: chrome.permissions.Permissions): Promise<void> => {
    const store = await bgStore

    // content settings permissions for notification blocker
    if (permissions.permissions?.includes(CONTENT_SETTINGS)) {
      const isNotificationBlockerEnabled = store.getState().notificationBlockerEnabled
      store.dispatch(addPermissions([CONTENT_SETTINGS]))
      // close it here since the native modal closes the popup
      store.dispatch(removeOverlay('notificationBlockerPermission'))
      if (isNotificationBlockerEnabled) {
        store.dispatch(enableBlockNotifications())
      } else {
        store.dispatch(resetNotificationBlocker())
      }

      store.dispatch(setShouldShowReloadAlert(true))
    }
  }
}

export function handlePermissionsRemoved(bgStore: Promise<StoreType>) {
  return async (permissions: chrome.permissions.Permissions): Promise<void> => {
    const store = await bgStore
    if (permissions.permissions?.includes(CONTENT_SETTINGS)) {
      store.dispatch(removePermissions([CONTENT_SETTINGS]))
      store.dispatch(removeOverlay('notificationBlockerPermission'))
    }
  }
}
