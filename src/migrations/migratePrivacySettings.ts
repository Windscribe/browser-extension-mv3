import { ReducerStateV2 } from 'api/types'
import Dexie from 'dexie'
import { pushToDebugLog } from 'services/debugLog'
import { StoreType } from 'state'
import { setLanguageWarpEnabled } from 'state/slices/languageWarpEnabled'
import { setLocationWarp } from 'state/slices/locationWarp'
import { addUserStateMigration, MigratedUserIdentifierArg } from 'state/slices/migration'
import {
  enableBlockNotifications,
  resetNotificationBlocker,
  setNotificationBlockerEnabled,
} from 'state/slices/notificationBlockerEnabled'

import {
  activateSplitPersonality,
  deactivateSplitPersonality,
} from 'state/slices/splitPersonalityEnabled'
import { setTimeWarpEnabled } from 'state/slices/timeWarpEnabled'
import { enableBlockWebRtc, resetWebRtcBlocker } from 'state/slices/webRtcEnabled'
import { setWorkerBlock } from 'state/slices/workerBlock'
import {
  DB_STATE_TABLE,
  SYNC_KEY,
  LANGUAGE_SWITCH_REDUCER,
  LOCATION_SPOOFER_REDUCER,
  WORKER_BLOCK_REDUCER,
  SPLIT_PERSONALITY_REDUCER,
  PROXY_TIME_REDUCER,
  WEB_RTC_REDUCER,
  NOTIFICATION_BLOCKER_REDUCER,
  MIGRATION_ID_V2_TO_V3,
  CONTENT_SETTINGS,
} from 'utils/constants'
import {
  LanguageWarpValidatorManifestV2,
  LocationWarpValidatorManifestV2,
  NotificationBlockerValidatorManifestV2,
  ProxyTimeValidatorManifestV2,
  SplitPersonalityValidatorManifestV2,
  WebRtcValidatorManifestV2,
  WorkerBlockValidatorManifestV2,
} from 'utils/validators'

// Note: adPrivacy under privacy settings is not stored in the db, we cannot migrate it.
export const migratePrivacySettings = async (
  db: Dexie,
  store: StoreType,
  userIdentifier: MigratedUserIdentifierArg,
): Promise<void> => {
  const languageWarpData: ReducerStateV2<boolean> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + LANGUAGE_SWITCH_REDUCER)

  const locationWarpData: ReducerStateV2<boolean> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + LOCATION_SPOOFER_REDUCER)

  const workerBlockData: ReducerStateV2<boolean> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + WORKER_BLOCK_REDUCER)

  const splitPersonalityData: ReducerStateV2<boolean> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + SPLIT_PERSONALITY_REDUCER)

  const proxyTimeData: ReducerStateV2<boolean> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + PROXY_TIME_REDUCER)

  const webRTCData: ReducerStateV2<boolean> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + WEB_RTC_REDUCER)

  const notificationBlockerData: ReducerStateV2<boolean> = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + NOTIFICATION_BLOCKER_REDUCER)

  await pushToDebugLog({
    level: 'INFO',
    message: `general settings`,
    tag: 'background',
    data: JSON.stringify({
      languageWarpData,
      locationWarpData,
      workerBlockData,
      splitPersonalityData,
      proxyTimeData,
      webRTCData,
      notificationBlockerData,
    }),
  })

  const languageWarpStateV2 = LanguageWarpValidatorManifestV2.safeParse(languageWarpData)
  const locationSpooferStateV2 = LocationWarpValidatorManifestV2.safeParse(locationWarpData)
  const workerBlockStateV2 = WorkerBlockValidatorManifestV2.safeParse(workerBlockData)
  const proxyTimeStateV2 = ProxyTimeValidatorManifestV2.safeParse(proxyTimeData)
  const webRTCStateV2 = WebRtcValidatorManifestV2.safeParse(webRTCData)

  const notificationBlockerStateV2 =
    NotificationBlockerValidatorManifestV2.safeParse(notificationBlockerData)
  const splitPersonalityStateV2 =
    SplitPersonalityValidatorManifestV2.safeParse(splitPersonalityData)

  if (languageWarpStateV2.success) {
    await store.dispatch(setLanguageWarpEnabled(languageWarpStateV2.data.state))
    store.dispatch(
      addUserStateMigration({
        migrationId: MIGRATION_ID_V2_TO_V3,
        ...userIdentifier,
        migratedStates: ['languageWarp'],
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      data: JSON.stringify(languageWarpStateV2.error),
      message: `Language warp reducer not found`,
      tag: 'background',
    })
  }

  if (locationSpooferStateV2.success) {
    await store.dispatch(setLocationWarp(locationSpooferStateV2.data.state))
    store.dispatch(
      addUserStateMigration({
        migrationId: MIGRATION_ID_V2_TO_V3,
        ...userIdentifier,
        migratedStates: ['locationWarp'],
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      data: JSON.stringify(locationSpooferStateV2.error),
      message: `Location spoofer reducer not found`,
      tag: 'background',
    })
  }

  if (workerBlockStateV2.success) {
    await store.dispatch(setWorkerBlock(workerBlockStateV2.data.state))
    store.dispatch(
      addUserStateMigration({
        migrationId: MIGRATION_ID_V2_TO_V3,
        ...userIdentifier,
        migratedStates: ['workerBlock'],
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Worker Block reducer not found`,
      data: JSON.stringify(workerBlockStateV2.error),
      tag: 'background',
    })
  }

  if (proxyTimeStateV2.success) {
    store.dispatch(setTimeWarpEnabled(proxyTimeStateV2.data.state))
    store.dispatch(
      addUserStateMigration({
        migrationId: MIGRATION_ID_V2_TO_V3,
        ...userIdentifier,
        migratedStates: ['timeWarp'],
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Proxy Time reducer not found`,
      data: JSON.stringify(proxyTimeStateV2.error),
      tag: 'background',
    })
  }

  if (webRTCStateV2.success) {
    if (webRTCStateV2.data.state) {
      await store.dispatch(enableBlockWebRtc())
    } else {
      await store.dispatch(resetWebRtcBlocker())
    }

    store.dispatch(
      addUserStateMigration({
        migrationId: MIGRATION_ID_V2_TO_V3,
        ...userIdentifier,
        migratedStates: ['webRtcBlocker'],
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `WebRTC reducer not found`,
      data: JSON.stringify(webRTCStateV2.error),
      tag: 'background',
    })
  }

  if (splitPersonalityStateV2.success) {
    if (splitPersonalityStateV2.data.state) {
      await store.dispatch(activateSplitPersonality())
    } else {
      await store.dispatch(deactivateSplitPersonality())
    }

    store.dispatch(
      addUserStateMigration({
        migrationId: MIGRATION_ID_V2_TO_V3,
        ...userIdentifier,
        migratedStates: ['splitPersonality'],
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Split Personality reducer not found`,
      data: JSON.stringify(splitPersonalityStateV2.error),
      tag: 'background',
    })
  }

  if (notificationBlockerStateV2.success) {
    const isGranted = await chrome.permissions.contains({ permissions: [CONTENT_SETTINGS] })

    console.log('migration notificationBlockerStateV2 is granted ?', isGranted)
    if (isGranted) {
      // do the actual migration
      console.log('doing actual migrating')
      if (notificationBlockerStateV2.data.state) {
        console.log('enableBlockNotifications')
        await store.dispatch(enableBlockNotifications())
      } else {
        console.log('resetNotificationBlocker')
        await store.dispatch(resetNotificationBlocker())
      }
    } else {
      console.log('not granted - migrating values only')
      // only migrate the setting value
      store.dispatch(setNotificationBlockerEnabled(notificationBlockerStateV2.data.state))
    }

    store.dispatch(
      addUserStateMigration({
        migrationId: MIGRATION_ID_V2_TO_V3,
        ...userIdentifier,
        migratedStates: ['notificationBlocker'],
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Notification Blocker reducer not found`,
      data: JSON.stringify(notificationBlockerStateV2.error),
      tag: 'background',
    })
  }
}
