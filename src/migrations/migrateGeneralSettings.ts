import { BooleanSettingReducerStateV2 } from 'api/types'
import Dexie from 'dexie'
import { pushToDebugLog } from 'services/debugLog'
import { StoreType } from 'state'
import { setAllowSystemNotifications } from 'state/slices/allowSystemNotifications'
import { showDebugContextMenu } from 'state/slices/contextMenu'
import { setLocationLoad } from 'state/slices/locationLoad'
import {
  DB_STATE_TABLE,
  DEBUG_CONTEXT_REDUCER,
  LOCATION_LOAD_REDUCER,
  SYSTEM_NOTIFICATIONS_REDUCER,
  SYNC_KEY,
} from 'utils/constants'
import {
  DebugViewValidatorManifestV2,
  LocationLoadValidatorManifestV2,
  SystemNotificationsValidatorManifestV2,
} from 'utils/validators'

export const migrateGeneralSettings = async (db: Dexie, store: StoreType): Promise<void> => {
  const locationLoadData: BooleanSettingReducerStateV2 = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + LOCATION_LOAD_REDUCER)

  const notificationBlockerData: BooleanSettingReducerStateV2 = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + SYSTEM_NOTIFICATIONS_REDUCER)

  const debugViewEnabledData: BooleanSettingReducerStateV2 = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + DEBUG_CONTEXT_REDUCER)

  await pushToDebugLog({
    level: 'INFO',
    message: `general settings`,
    tag: 'background',
    data: JSON.stringify({
      locationLoadData,
      debugViewEnabledData,
      notificationBlockerData,
    }),
  })

  const parsedLocationLoadStateV2 = LocationLoadValidatorManifestV2.safeParse(locationLoadData)
  const parsedNotificationBlockerStateV2 =
    SystemNotificationsValidatorManifestV2.safeParse(notificationBlockerData)
  const parsedDebugViewEnabledStateV2 = DebugViewValidatorManifestV2.safeParse(debugViewEnabledData)

  if (parsedLocationLoadStateV2.success) {
    await store.dispatch(setLocationLoad(parsedLocationLoadStateV2.data.state))
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Location load reducer not found`,
      tag: 'background',
    })
  }

  if (parsedNotificationBlockerStateV2.success) {
    await store.dispatch(setAllowSystemNotifications(parsedNotificationBlockerStateV2.data.state))
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Notification blocker reducer not found`,
      tag: 'background',
    })
  }

  if (parsedDebugViewEnabledStateV2.success) {
    await store.dispatch(showDebugContextMenu(parsedDebugViewEnabledStateV2.data.state))
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Debug view reducer not found`,
      tag: 'background',
    })
  }
}
