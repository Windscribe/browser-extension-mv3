import { ReducerStateV2 } from 'api/types'
import Dexie from 'dexie'
import { pushToDebugLog } from 'services/debugLog'
import { StoreType } from 'state'
import { setAllowSystemNotifications } from 'state/slices/allowSystemNotifications'
import { showDebugContextMenu } from 'state/slices/contextMenu'
import { setLocationLoad } from 'state/slices/locationLoad'
import { addUserStateMigration, MigratedUserIdentifierArg } from 'state/slices/migration'
import {
  DB_STATE_TABLE,
  DEBUG_CONTEXT_REDUCER,
  LOCATION_LOAD_REDUCER,
  SYSTEM_NOTIFICATIONS_REDUCER,
  SYNC_KEY,
  MIGRATION_ID_V2_TO_V3,
} from 'utils/constants'
import {
  DebugViewValidatorManifestV2,
  LocationLoadValidatorManifestV2,
  SystemNotificationsValidatorManifestV2,
} from 'utils/validators'

export const migrateGeneralSettings = async (
  db: Dexie,
  store: StoreType,
  userIdentifier: MigratedUserIdentifierArg,
): Promise<void> => {
  const locationLoadData: ReducerStateV2<boolean> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + LOCATION_LOAD_REDUCER)

  const notificationBlockerData: ReducerStateV2<boolean> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + SYSTEM_NOTIFICATIONS_REDUCER)

  const debugViewEnabledData: ReducerStateV2<boolean> = await db
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
    store.dispatch(setLocationLoad(parsedLocationLoadStateV2.data.state))
    store.dispatch(
      addUserStateMigration({
        migrationId: MIGRATION_ID_V2_TO_V3,
        ...userIdentifier,
        migratedStates: ['locationLoad'],
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Location load reducer not found`,
      tag: 'background',
      data: JSON.stringify(parsedLocationLoadStateV2.error),
    })
  }

  if (parsedNotificationBlockerStateV2.success) {
    store.dispatch(setAllowSystemNotifications(parsedNotificationBlockerStateV2.data.state))
    store.dispatch(
      addUserStateMigration({
        migrationId: MIGRATION_ID_V2_TO_V3,
        ...userIdentifier,
        migratedStates: ['allowSystemNotifications'],
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Notification blocker reducer not found`,
      tag: 'background',
      data: JSON.stringify(parsedNotificationBlockerStateV2.error),
    })
  }

  if (parsedDebugViewEnabledStateV2.success) {
    store.dispatch(showDebugContextMenu(parsedDebugViewEnabledStateV2.data.state))
    store.dispatch(
      addUserStateMigration({
        migrationId: MIGRATION_ID_V2_TO_V3,
        ...userIdentifier,
        migratedStates: ['showDebugContextMenu'],
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Debug view reducer not found`,
      tag: 'background',
      data: JSON.stringify(parsedDebugViewEnabledStateV2.error),
    })
  }
}
