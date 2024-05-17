import { Dexie } from 'dexie'
import { pushToDebugLog } from 'services/debugLog'
import getErrorMessage from 'utils/getErrorMessage'
import {
  DB_NAME,
  DB_STATE_TABLE,
  DB_VERSION,
  SESSION_REDUCER,
  SYNC_KEY,
  USER_STASHES_REDUCER,
} from 'utils/constants'
import { checkSessionStatus, replaceSession } from 'state/slices/session'
import { SessionDataV2, ReducerStateV2 } from 'api/types'
import { SessionDataValidatorManifestV2, UserStashesValidatorManifestV2 } from 'utils/validators'
import { type StoreType } from 'state'
import { setMigrationStatus } from 'state/slices/migration'
import { migrateGeneralSettings } from './migrateGeneralSettings'
import { migratePrivacySettings } from './migratePrivacySettings'
import { migrateConnectionSettings } from './migrateConnectionSettings'
import { migrateOtherSettings } from './migrateOtherSettings'
import md5 from 'crypto-js/md5'

import { migrateStashedPrivacySettings } from './migrateStashedPrivacySettings'
import { migrateStashedGeneralSettings } from './migrateStashedGeneralSettings'
import { migrateStashedConnectionSettings } from './migrateStashedConnectionSettings'
import { migrateStashedOtherSettings } from './migrateStashedOtherSettings'

const runMigrationFromManifestV2ToV3 = async (store: StoreType): Promise<void> => {
  // never change this id
  const MIGRATION_ID = 'V2_TO_V3_MIGRATION'

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
    const migration = migrations.migrations.find(i => i.id === MIGRATION_ID)

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
        const message = getErrorMessage(parsedSessionStateV2.error)
        await pushToDebugLog({
          level: 'ERROR',
          message,
          data: JSON.stringify(parsedSessionStateV2.error),
          tag: 'background',
        })
        return
      }

      if (!parsedSessionStateV2.data.session_auth_hash) {
        await pushToDebugLog({
          level: 'INFO',
          message: 'User is logged out',
          data: JSON.stringify(parsedSessionStateV2.data),
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
          message: 'User stashes not found',
          data: JSON.stringify(parsedUserStashesStateV2.error),
          tag: 'background',
        })
        return
      }

      return parsedUserStashesStateV2
    }

    const validatedSession = await validateSession()

    const validatedUserStashes = await validateUserStashes()

    if (validatedSession?.success) {
      // dont pass loading or error
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { loading, error, ...rest } = sessionData.state

      // apply migration
      await store.dispatch(
        replaceSession({
          //  fix for type mismatch
          ...(rest as unknown as SessionDataV2),
        }),
      )

      // only migrate other settings if there is a valid session
      await migrateGeneralSettings(db, store)
      await migratePrivacySettings(db, store)
      await migrateConnectionSettings(db, store)
      await migrateOtherSettings(db, store)
      await store.dispatch(checkSessionStatus())
    }

    // migrate user stashes
    if (validatedUserStashes?.success) {
      const loggedInUserHash = validatedSession?.data.user_id
        ? md5(validatedSession.data.user_id).toString()
        : null

      const userHashes = Object.keys(validatedUserStashes.data.state)
      for (const hashedUserId of userHashes) {
        // skip if user is already logged in and migrated, we dont
        // want their stashed states since it's outdated compared to the current
        // logged in state, stashed state only updates on logout
        if (loggedInUserHash === hashedUserId) {
          continue
        }

        await migrateStashedGeneralSettings(store, validatedUserStashes.data, hashedUserId)
        await migrateStashedPrivacySettings(store, validatedUserStashes.data, hashedUserId)
        await migrateStashedConnectionSettings(store, validatedUserStashes.data, hashedUserId)
        await migrateStashedOtherSettings(store, validatedUserStashes.data, hashedUserId)
      }
    }

    // lastly migration is done
    await pushToDebugLog({
      level: 'INFO',
      message: 'Migration completed',
      data: JSON.stringify(store.getState().session),
      tag: 'background',
    })
    await store.dispatch(
      setMigrationStatus({
        id: MIGRATION_ID,
        completed: true,
        reason: 'Successfully migrated all the states',
      }),
    )
  } catch (err) {
    const message = getErrorMessage(err)
    await pushToDebugLog({
      level: 'ERROR',
      message,
      data: JSON.stringify(err),
      tag: 'background',
    })

    await store.dispatch(
      setMigrationStatus({
        id: MIGRATION_ID,
        completed: false,
        reason: `Failed migration due to 
        ----------------------
        ${JSON.stringify(err)}`,
      }),
    )
  }
}

export { runMigrationFromManifestV2ToV3 }
