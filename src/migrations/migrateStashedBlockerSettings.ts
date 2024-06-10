import { pushToDebugLog } from 'services/debugLog'
import { StoreType } from 'state'
import { setAndMergeStashes } from 'state/slices/userStashes'
import { StashedBlockListsValidatorManifestV2 } from 'utils/validators'
import { BLOCKER_SETTINGS_MAPPER } from './migrateBlockerSettings'
import sendMessage from 'services/runtime/sendMessage'
import { initialState as initialBlockerState } from 'state/slices/blocker'

export const migrateStashedBlockerSettings = async (
  store: StoreType,
  data: unknown,
  hashedUserId: string,
): Promise<void> => {
  const parsedBlockListsStateV2 = StashedBlockListsValidatorManifestV2.safeParse(data)

  if (parsedBlockListsStateV2.success) {
    const newBlocklist: string[] = parsedBlockListsStateV2.data.state[
      hashedUserId
    ].blockListsEnabled
      .map(blockList => {
        return BLOCKER_SETTINGS_MAPPER[blockList as keyof typeof BLOCKER_SETTINGS_MAPPER]
      })
      .filter(blockList => !!blockList)

    await store.dispatch(
      setAndMergeStashes({
        hashedID: hashedUserId,
        data: {
          blocker: {
            ...initialBlockerState,
            // we can have two default entries in this array, so we remove
            // the duplicates
            blockLists: Array.from(
              new Set([...initialBlockerState.blockLists, ...newBlocklist]).values(),
            ),
          },
        },
      }),
    )

    await sendMessage({
      what: 'applyRulesets',
      from: 'popup',
      enabledRulesets: newBlocklist,
    })
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Block List stashed state not found`,
      tag: 'background',
      data: JSON.stringify(parsedBlockListsStateV2.error),
    })
  }
}
