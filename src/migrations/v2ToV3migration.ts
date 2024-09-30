import { Dexie } from 'dexie'
import { pushToDebugLog } from 'services/debugLog'
import getErrorMessage from 'utils/getErrorMessage'
import {
  DB_NAME,
  DB_STATE_TABLE,
  DB_VERSION,
  MIGRATION_ID_V2_TO_V3,
  SESSION_REDUCER,
  SYNC_KEY,
  USER_STASHES_REDUCER,
} from 'utils/constants'
import { checkSessionStatus, replaceSession, setSessionLoading } from 'state/slices/session'
import { SessionDataV2, ReducerStateV2 } from 'api/types'
import { SessionDataValidatorManifestV2, UserStashesValidatorManifestV2 } from 'utils/validators'
import { type StoreType } from 'state'
import {
  addFoundUserIds,
  createMigrationEntry,
  MigrationStatus,
  updateMigrationEntry,
} from 'state/slices/migration'
import { migrateGeneralSettings } from './migrateGeneralSettings'
import { migrateBlockerSettings } from './migrateBlockerSettings'
import { migratePrivacySettings } from './migratePrivacySettings'
import { migrateConnectionSettings } from './migrateConnectionSettings'
import { migrateOtherSettings } from './migrateOtherSettings'
import md5 from 'crypto-js/md5'

import { migrateStashedPrivacySettings } from './migrateStashedPrivacySettings'
import { migrateStashedGeneralSettings } from './migrateStashedGeneralSettings'
import { migrateStashedConnectionSettings } from './migrateStashedConnectionSettings'
import { migrateStashedOtherSettings } from './migrateStashedOtherSettings'
import { migrateStashedBlockerSettings } from './migrateStashedBlockerSettings'

// never change this id

const runMigrationFromManifestV2ToV3 = async (
  store: StoreType,
  details: chrome.runtime.InstalledDetails,
): Promise<void | boolean> => {
  try {
    const doesDBExist = await Dexie.exists(DB_NAME)

    // do nothing if we have nothing to import from i.e this is the first ever install of the new extension
    if (!doesDBExist) {
      await pushToDebugLog({
        level: 'INFO',
        message: 'DB does not exist, skipping migration',
        tag: 'background',
      })
      return
    }

    const migrations = store.getState().migrations
    const migration = migrations.migrations.find(i => i.id === MIGRATION_ID_V2_TO_V3)

    await pushToDebugLog({
      level: 'INFO',
      message: 'Migration object',
      data: JSON.stringify(migration),
      tag: 'background',
    })

    if (migration) {
      // already migrated do nothing
      await pushToDebugLog({
        level: 'INFO',
        message: `Migration already performed`,
        data: JSON.stringify(migration),
        tag: 'background',
      })
      return
    }

    const preMigrationStorage = await chrome.storage.local.getBytesInUse()

    await store.dispatch(
      createMigrationEntry({
        id: MIGRATION_ID_V2_TO_V3,
        changes: {
          preMigrationStorage,
          extensionCurrentVersion: chrome.runtime.getManifest().version,
          extensionPreviousVersion: details.previousVersion,
        },
      }),
    )

    // not migrated, continue...
    const db = new Dexie(DB_NAME)

    db.version(DB_VERSION).stores({
      WS_STATE: 'reducer',
      WS_LOGS: '++id, [timestamp+activity]',
    })

    const sessionData: ReducerStateV2<SessionDataV2> = await db
      .table(DB_STATE_TABLE)
      .get(SYNC_KEY + SESSION_REDUCER)

    await pushToDebugLog({
      level: 'INFO',
      message: 'Session data from indexedDB for extension manifest v2',
      data: JSON.stringify(sessionData),
      tag: 'background',
    })

    await pushToDebugLog({
      level: 'INFO',
      message: 'Manifest V3 extension state BEFORE migration',
      data: JSON.stringify(store.getState()),
      tag: 'background',
    })

    const validateSession = async () => {
      if (!sessionData || !sessionData.reducer || !sessionData.state) {
        await pushToDebugLog({
          level: 'INFO',
          message: `Session reducer not found`,
          tag: 'background',
        })
        return
      }

      // zod will strip unrecognized keys from the object being validated
      const parsedSessionStateV2 = SessionDataValidatorManifestV2.safeParse(sessionData.state)

      if (!parsedSessionStateV2.success) {
        await pushToDebugLog({
          level: 'ERROR',
          message: 'Session is not valid',
          data: JSON.stringify({
            error: parsedSessionStateV2.error,
            session: sessionData,
          }),
          tag: 'background',
        })
        return
      }

      if (!parsedSessionStateV2.data.session_auth_hash) {
        await pushToDebugLog({
          level: 'INFO',
          message: 'User is logged out',
          data: JSON.stringify({
            session: sessionData,
          }),
          tag: 'background',
        })
        return
      }

      if (parsedSessionStateV2.data.error) {
        await pushToDebugLog({
          level: 'INFO',
          message: 'Session contains error',
          data: JSON.stringify({
            session: sessionData,
          }),
          tag: 'background',
        })
        return
      }

      // user is logged in
      return parsedSessionStateV2
    }

    const validateUserStashes = async () => {
      const userStashesData: ReducerStateV2<unknown> = await db
        .table(DB_STATE_TABLE)
        .get(SYNC_KEY + USER_STASHES_REDUCER)

      const parsedUserStashesStateV2 = UserStashesValidatorManifestV2.safeParse(userStashesData)

      if (!parsedUserStashesStateV2.success) {
        await pushToDebugLog({
          level: 'INFO',
          message: 'User stashes not valid',
          data: JSON.stringify(parsedUserStashesStateV2.error),
          tag: 'background',
        })
        return
      }

      return parsedUserStashesStateV2
    }

    const validatedSession = await validateSession()

    const validatedUserStashes = await validateUserStashes()

    let wasNonStashedStateMigrated = false

    if (validatedSession?.success) {
      // dont pass error
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { error, email, ...rest } = validatedSession.data

      // apply migration
      store.dispatch(
        replaceSession({
          // TODO: fix this by fixing types
          ...rest,
          email: email ?? undefined,
        }),
      )

      store.dispatch(setSessionLoading('fulfilled'))

      store.dispatch(
        addFoundUserIds({
          migrationId: MIGRATION_ID_V2_TO_V3,
          userHashesAndIdsFound: [rest.user_id],
        }),
      )

      const userIdentifier = {
        idOrHash: rest.user_id,
        username: rest.username,
      }

      // only migrate other settings if there is a valid session
      await migrateGeneralSettings(db, store, userIdentifier)
      await migratePrivacySettings(db, store, userIdentifier)
      await migrateConnectionSettings(db, store, userIdentifier)
      await migrateOtherSettings(db, store, userIdentifier)
      await migrateBlockerSettings(db, store, userIdentifier)
      await store.dispatch(checkSessionStatus())
      wasNonStashedStateMigrated = true
    }

    // migrate user stashes
    if (validatedUserStashes?.success) {
      const loggedInUserHash = validatedSession?.data.user_id
        ? md5(validatedSession.data.user_id).toString()
        : null

      const userHashes = Object.keys(validatedUserStashes.data.state)

      // found stash id's
      store.dispatch(
        addFoundUserIds({
          migrationId: MIGRATION_ID_V2_TO_V3,
          userHashesAndIdsFound: userHashes,
        }),
      )

      for (const hashedUserId of userHashes) {
        // skip if user is already logged in and migrated, we dont
        // want their stashed states since it's outdated compared to the current
        // logged in state, stashed state only updates on logout
        if (loggedInUserHash === hashedUserId) {
          continue
        }

        const userIdentifier = {
          idOrHash: hashedUserId,
        }

        await migrateStashedGeneralSettings(store, validatedUserStashes.data, userIdentifier)
        await migrateStashedConnectionSettings(store, validatedUserStashes.data, userIdentifier)
        await migrateStashedOtherSettings(store, validatedUserStashes.data, userIdentifier)
        await migrateStashedBlockerSettings(store, validatedUserStashes.data, userIdentifier)
        await migrateStashedPrivacySettings(store, validatedUserStashes.data, userIdentifier)
      }
    }

    // lastly migration is done
    await pushToDebugLog({
      level: 'INFO',
      message: 'Migration run complete',
      data: JSON.stringify(store.getState().session),
      tag: 'background',
    })

    store.dispatch(
      updateMigrationEntry({
        migrationId: MIGRATION_ID_V2_TO_V3,
        changes: {
          status: 'completed',
          endedAt: new Date().toUTCString(),
        },
      }),
    )

    return wasNonStashedStateMigrated
  } catch (err) {
    const message = getErrorMessage(err)
    await pushToDebugLog({
      level: 'ERROR',
      message,
      data: JSON.stringify(err),
      tag: 'background',
    })

    // update status and add fail reason
    // if all users, states, stashed users, their states are migrated then count it as a complete migration
    // other wise if some of them are migrated make it partial
    // else if none of them are migrated mark it as a failed migration

    const currentMigration = store
      .getState()
      .migrations.migrations.find(mig => mig.id === MIGRATION_ID_V2_TO_V3)

    if (!currentMigration) {
      await pushToDebugLog({
        message: 'Could not find migration in catch clause - this should not happen ever',
        level: 'ERROR',
      })
      return
    }

    const postMigrationStorage = await chrome.storage.local.getBytesInUse().catch(err => {
      pushToDebugLog({
        message: 'Could not retrieve postMigrationStorage',
        level: 'ERROR',
        data: JSON.stringify(err),
      })
    })

    store.dispatch(
      updateMigrationEntry({
        migrationId: MIGRATION_ID_V2_TO_V3,
        changes: {
          status: 'failed',
          error: JSON.stringify(err),
          endedAt: new Date().toUTCString(),
          ...(postMigrationStorage && { postMigrationStorage }),
        },
      }),
    )
  }
}

export { runMigrationFromManifestV2ToV3 }
