import { pushToDebugLog } from 'services/debugLog'
import { StoreType } from 'state'
import { addUserStateMigration, MigratedUserIdentifierArg } from 'state/slices/migration'
import { setAndMergeStashes } from 'state/slices/userStashes'
import { MIGRATION_ID_V2_TO_V3 } from 'utils/constants'
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
  userIdentifier: MigratedUserIdentifierArg,
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
        hashedID: userIdentifier.idOrHash,
        data: {
          languageWarpEnabled:
            languageWarpStateV2.data.state[userIdentifier.idOrHash].languageSwitchEnabled,
        },
      }),
    )

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
      message: 'Language warp stashed state not found',
      tag: 'background',
      data: JSON.stringify(languageWarpStateV2.error),
    })
  }

  if (locationSpooferStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: userIdentifier.idOrHash,
        data: {
          locationWarp:
            locationSpooferStateV2.data.state[userIdentifier.idOrHash].locationSpooferEnabled,
        },
      }),
    )

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
      message: 'Location spoofer stashed state not found',
      tag: 'background',
      data: JSON.stringify(locationSpooferStateV2.error),
    })
  }

  if (workerBlockStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: userIdentifier.idOrHash,
        data: {
          workerBlock: workerBlockStateV2.data.state[userIdentifier.idOrHash].workerBlockEnabled,
        },
      }),
    )

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
      message: 'Worked block stashed state not found',
      tag: 'background',
      data: JSON.stringify(workerBlockStateV2.error),
    })
  }

  if (proxyTimeStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: userIdentifier.idOrHash,
        data: {
          timeWarpEnabled: proxyTimeStateV2.data.state[userIdentifier.idOrHash].proxyTimeEnabled,
        },
      }),
    )

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
      message: 'Proxy time stashed state not found',
      tag: 'background',
      data: JSON.stringify(proxyTimeStateV2.error),
    })
  }

  if (webRTCStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: userIdentifier.idOrHash,
        data: {
          webRtcEnabled: webRTCStateV2.data.state[userIdentifier.idOrHash].webRTCEnabled,
        },
      }),
    )
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
      message: 'WebRTC stashed state not found',
      tag: 'background',
      data: JSON.stringify(webRTCStateV2.error),
    })
  }

  if (notificationBlockerStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: userIdentifier.idOrHash,
        data: {
          notificationBlockerEnabled:
            notificationBlockerStateV2.data.state[userIdentifier.idOrHash]
              .notificationBlockerEnabled,
        },
      }),
    )

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
      message: 'Notification blocker stashed state not found',
      tag: 'background',
      data: JSON.stringify(notificationBlockerStateV2.error),
    })
  }

  if (splitPersonalityStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: userIdentifier.idOrHash,
        data: {
          splitPersonalityEnabled:
            splitPersonalityStateV2.data.state[userIdentifier.idOrHash].splitPersonalityEnabled,
        },
      }),
    )

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
      message: 'Split personality stashed state not found',
      tag: 'background',
      data: JSON.stringify(splitPersonalityStateV2.error),
    })
  }
}
