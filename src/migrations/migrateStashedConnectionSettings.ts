import { pushToDebugLog } from 'services/debugLog'
import { StoreType } from 'state'
import { initialState as initialConnectionState } from 'state/slices/connection'
import { addUserStateMigration, MigratedUserIdentifierArg } from 'state/slices/migration'
import { setAndMergeStashes } from 'state/slices/userStashes'
import { MIGRATION_ID_V2_TO_V3 } from 'utils/constants'
import { StashedAutoConnectValidatorManifestV2 } from 'utils/validators'

export const migrateStashedConnectionSettings = async (
  store: StoreType,
  data: unknown,
  userIdentifier: MigratedUserIdentifierArg,
): Promise<void> => {
  const parsedAutoConnectStateV2 = StashedAutoConnectValidatorManifestV2.safeParse(data)

  if (parsedAutoConnectStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: userIdentifier.idOrHash,
        data: {
          connection: {
            ...initialConnectionState,
            autoConnect: parsedAutoConnectStateV2.data.state[userIdentifier.idOrHash].autoConnect,
          },
        },
      }),
    )

    store.dispatch(
      addUserStateMigration({
        migrationId: MIGRATION_ID_V2_TO_V3,
        ...userIdentifier,
        migratedStates: ['autoConnect'],
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Auto Connect in Connection Settings stashed state not found.`,
      tag: 'background',
      data: JSON.stringify(parsedAutoConnectStateV2.error),
    })
  }
}
