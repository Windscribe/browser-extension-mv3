import Dexie from 'dexie'
import { pushToDebugLog } from 'services/debugLog'
import sendMessage from 'services/runtime/sendMessage'
import { StoreType } from 'state'
import { setBlockLists } from 'state/slices/blocker'
import { BLOCK_LISTS_REDUCER, DB_STATE_TABLE, SYNC_KEY } from 'utils/constants'
import { BlockListsValidatorManifestV2 } from 'utils/validators'

// left side (key) is the blocker enabled list for v2 and right side (value) is the same but for v3

export const BLOCKER_SETTINGS_MAPPER = {
  adblock: 'default',
  trackers: 'adguard-spyware-url',
  social: 'annoyances-social',
  cookieaway: 'annoyances-cookies',
}

export const migrateBlockerSettings = async (db: Dexie, store: StoreType): Promise<void> => {
  const blockListsData = await db.table(DB_STATE_TABLE).get(SYNC_KEY + BLOCK_LISTS_REDUCER)

  await pushToDebugLog({
    level: 'INFO',
    message: `general settings`,
    tag: 'background',
    data: JSON.stringify({
      blockListsData,
    }),
  })

  const parsedBlockListsStateV2 = BlockListsValidatorManifestV2.safeParse(blockListsData)

  if (parsedBlockListsStateV2.success) {
    const newBlocklist: string[] = parsedBlockListsStateV2.data.state
      .map(blockList => {
        return BLOCKER_SETTINGS_MAPPER[blockList as keyof typeof BLOCKER_SETTINGS_MAPPER]
      })
      .filter(blockList => !!blockList)

    store.dispatch(setBlockLists(newBlocklist))

    await sendMessage({
      what: 'applyRulesets',
      from: 'popup',
      enabledRulesets: newBlocklist,
    })
  } else {
    await pushToDebugLog({
      level: 'INFO',
      message: `Block List reducer not found`,
      tag: 'background',
    })
  }
}
