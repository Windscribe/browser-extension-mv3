import { BooleanSettingReducerStateV2 } from 'api/types'
import Dexie from 'dexie'
import { pushToDebugLog } from 'services/debugLog'
import { StoreType } from 'state'
import { setLanguageWarpEnabled } from 'state/slices/languageWarpEnabled'
import { setLocationWarp } from 'state/slices/locationWarp'
import {
  enableBlockNotifications,
  resetNotificationBlocker,
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
export const migratePrivacySettings = async (db: Dexie, store: StoreType): Promise<void> => {
  const languageWarpData: BooleanSettingReducerStateV2 = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + LANGUAGE_SWITCH_REDUCER)

  const locationWarpData: BooleanSettingReducerStateV2 = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + LOCATION_SPOOFER_REDUCER)

  const workerBlockData: BooleanSettingReducerStateV2 = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + WORKER_BLOCK_REDUCER)

  const splitPersonalityData: BooleanSettingReducerStateV2 = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + SPLIT_PERSONALITY_REDUCER)

  const proxyTimeData: BooleanSettingReducerStateV2 = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + PROXY_TIME_REDUCER)

  const webRTCData: BooleanSettingReducerStateV2 = await db
    .table(DB_STATE_TABLE)
    .get(SYNC_KEY + WEB_RTC_REDUCER)

  const notificationBlockerData: BooleanSettingReducerStateV2 = await db
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
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Location load reducer not found`,
      data: languageWarpStateV2.error,
      tag: 'background',
    })
  }

  if (locationSpooferStateV2.success) {
    await store.dispatch(setLocationWarp(locationSpooferStateV2.data.state))
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Notification blocker reducer not found`,
      data: locationSpooferStateV2.error,
      tag: 'background',
    })
  }

  if (workerBlockStateV2.success) {
    await store.dispatch(setWorkerBlock(workerBlockStateV2.data.state))
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Worker Block reducer not found`,
      data: workerBlockStateV2.error,
      tag: 'background',
    })
  }

  if (proxyTimeStateV2.success) {
    store.dispatch(setTimeWarpEnabled(proxyTimeStateV2.data.state))
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Proxy Time reducer not found`,
      data: proxyTimeStateV2.error,
      tag: 'background',
    })
  }

  if (webRTCStateV2.success) {
    if (webRTCStateV2.data.state) {
      await store.dispatch(enableBlockWebRtc())
    } else {
      await store.dispatch(resetWebRtcBlocker())
    }
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `WebRTC reducer not found`,
      data: webRTCStateV2.error,
      tag: 'background',
    })
  }

  if (splitPersonalityStateV2.success) {
    if (splitPersonalityStateV2.data.state) {
      await store.dispatch(activateSplitPersonality())
    } else {
      await store.dispatch(deactivateSplitPersonality())
    }
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Split Personality reducer not found`,
      data: splitPersonalityStateV2.error,
      tag: 'background',
    })
  }

  if (notificationBlockerStateV2.success) {
    if (notificationBlockerStateV2.data.state) {
      await store.dispatch(enableBlockNotifications())
    } else {
      await store.dispatch(resetNotificationBlocker())
    }
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Notification Blocker reducer not found`,
      data: notificationBlockerStateV2.error,
      tag: 'background',
    })
  }
}
