import { pushToDebugLog } from 'services/debugLog'
import { StoreType } from 'state'
import { addUserStateMigration, MigratedUserIdentifierArg } from 'state/slices/migration'
import { setAndMergeStashes } from 'state/slices/userStashes'
import { MIGRATION_ID_V2_TO_V3 } from 'utils/constants'
import {
  StashedLocationLoadValidatorManifestV2,
  StashedSystemNotificationsValidatorManifestV2,
} from 'utils/validators'

export const migrateStashedGeneralSettings = async (
  store: StoreType,
  data: unknown,
  userIdentifier: MigratedUserIdentifierArg,
): Promise<void> => {
  const parsedLocationLoadStateV2 = StashedLocationLoadValidatorManifestV2.safeParse(data)
  const parsedNotificationBlockerStateV2 =
    StashedSystemNotificationsValidatorManifestV2.safeParse(data)

  if (parsedLocationLoadStateV2.success) {
    store.dispatch(
      setAndMergeStashes({
        hashedID: userIdentifier.idOrHash,
        data: {
          locationLoad:
            parsedLocationLoadStateV2.data.state[userIdentifier.idOrHash].locationLoadEnabled,
        },
      }),
    )

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
      message: 'Location load reducer stashed state not found',
      tag: 'background',
      data: JSON.stringify(parsedLocationLoadStateV2.error),
    })
  }

  if (parsedNotificationBlockerStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: userIdentifier.idOrHash,
        data: {
          allowSystemNotifications:
            parsedNotificationBlockerStateV2.data.state[userIdentifier.idOrHash]
              .allowSystemNotifications,
        },
      }),
    )

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
      message: 'Extension Connect/Disconnect Notification blocker reducer stashed state not found',
      tag: 'background',
      data: JSON.stringify(parsedNotificationBlockerStateV2.error),
    })
  }
}
