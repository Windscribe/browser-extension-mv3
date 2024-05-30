import { pushToDebugLog } from 'services/debugLog'
import { StoreType } from 'state'
import { setAndMergeStashes } from 'state/slices/userStashes'
import {
  StashedLocationLoadValidatorManifestV2,
  StashedSystemNotificationsValidatorManifestV2,
} from 'utils/validators'

export const migrateStashedGeneralSettings = async (
  store: StoreType,
  data: unknown,
  hashedUserId: string,
): Promise<void> => {
  const parsedLocationLoadStateV2 = StashedLocationLoadValidatorManifestV2.safeParse(data)
  const parsedNotificationBlockerStateV2 =
    StashedSystemNotificationsValidatorManifestV2.safeParse(data)

  if (parsedLocationLoadStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: hashedUserId,
        data: {
          locationLoad: parsedLocationLoadStateV2.data.state[hashedUserId].locationLoadEnabled,
        },
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
    await store.dispatch(
      setAndMergeStashes({
        hashedID: hashedUserId,
        data: {
          allowSystemNotifications:
            parsedNotificationBlockerStateV2.data.state[hashedUserId].allowSystemNotifications,
        },
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
}
