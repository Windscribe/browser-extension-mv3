import { pushToDebugLog } from 'services/debugLog'
import { StoreType } from 'state'
import { initialState as initialConnectionState } from 'state/slices/connection'
import { setAndMergeStashes } from 'state/slices/userStashes'
import { StashedAutoConnectValidatorManifestV2 } from 'utils/validators'

export const migrateStashedConnectionSettings = async (
  store: StoreType,
  data: unknown,
  hashedUserId: string,
): Promise<void> => {
  const parsedAutoConnectStateV2 = StashedAutoConnectValidatorManifestV2.safeParse(data)

  if (parsedAutoConnectStateV2.success) {
    await store.dispatch(
      setAndMergeStashes({
        hashedID: hashedUserId,
        data: {
          connection: {
            ...initialConnectionState,
            autoConnect: parsedAutoConnectStateV2.data.state[hashedUserId].autoConnect,
          },
        },
      }),
    )
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Smokewall stashed state not found`,
      tag: 'background',
      data: JSON.stringify(parsedAutoConnectStateV2.error),
    })
  }
}
