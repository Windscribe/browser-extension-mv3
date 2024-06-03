import { pushToDebugLog } from 'services/debugLog'
import { StoreType } from 'state'
import { setAndMergeStashes } from 'state/slices/userStashes'
import {
  StashedLanguageWarpValidatorManifestV2,
  StashedLocationWarpValidatorManifestV2,
  StashedNotificationBlockerValidatorManifestV2,
  StashedProxyTimeValidatorManifestV2,
  StashedSplitPersonalityValidatorManifestV2,
  StashedWebRtcValidatorManifestV2,
  StashedWorkerBlockValidatorManifestV2,
} from 'utils/validators'

export const migrateStashedPrivacySettings = async (
  store: StoreType,
  data: unknown,
  hashedUserId: string,
): Promise<void> => {
  const languageWarpStateV2 = StashedLanguageWarpValidatorManifestV2.safeParse(data)
  const locationSpooferStateV2 = StashedLocationWarpValidatorManifestV2.safeParse(data)
  const workerBlockStateV2 = StashedWorkerBlockValidatorManifestV2.safeParse(data)
  const proxyTimeStateV2 = StashedProxyTimeValidatorManifestV2.safeParse(data)
  const webRTCStateV2 = StashedWebRtcValidatorManifestV2.safeParse(data)

  const notificationBlockerStateV2 = StashedNotificationBlockerValidatorManifestV2.safeParse(data)
  const splitPersonalityStateV2 = StashedSplitPersonalityValidatorManifestV2.safeParse(data)

  if (languageWarpStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: hashedUserId,
        data: {
          languageWarpEnabled: languageWarpStateV2.data.state[hashedUserId].languageSwitchEnabled,
        },
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: 'Language warp stashed state not found',
      tag: 'background',
      data: JSON.stringify(languageWarpStateV2.error),
    })
  }

  if (locationSpooferStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: hashedUserId,
        data: {
          locationWarp: locationSpooferStateV2.data.state[hashedUserId].locationSpooferEnabled,
        },
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: 'Location spoofer stashed state not found',
      tag: 'background',
      data: JSON.stringify(locationSpooferStateV2.error),
    })
  }

  if (workerBlockStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: hashedUserId,
        data: {
          workerBlock: workerBlockStateV2.data.state[hashedUserId].workerBlockEnabled,
        },
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: 'Worked block stashed state not found',
      tag: 'background',
      data: JSON.stringify(workerBlockStateV2.error),
    })
  }

  if (proxyTimeStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: hashedUserId,
        data: {
          timeWarpEnabled: proxyTimeStateV2.data.state[hashedUserId].proxyTimeEnabled,
        },
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: 'Proxy time stashed state not found',
      tag: 'background',
      data: JSON.stringify(proxyTimeStateV2.error),
    })
  }

  if (webRTCStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: hashedUserId,
        data: {
          webRtcEnabled: webRTCStateV2.data.state[hashedUserId].webRTCEnabled,
        },
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: 'WebRTC stashed state not found',
      tag: 'background',
      data: JSON.stringify(webRTCStateV2.error),
    })
  }

  if (notificationBlockerStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: hashedUserId,
        data: {
          notificationBlockerEnabled:
            notificationBlockerStateV2.data.state[hashedUserId].notificationBlockerEnabled,
        },
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: 'Notification blocker stashed state not found',
      tag: 'background',
      data: JSON.stringify(notificationBlockerStateV2.error),
    })
  }

  if (splitPersonalityStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: hashedUserId,
        data: {
          splitPersonalityEnabled:
            splitPersonalityStateV2.data.state[hashedUserId].splitPersonalityEnabled,
        },
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: 'Split personality stashed state not found',
      tag: 'background',
      data: JSON.stringify(splitPersonalityStateV2.error),
    })
  }
}
