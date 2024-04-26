import { Dexie } from 'dexie'
import { pushToDebugLog } from 'services/debugLog'
import getErrorMessage from 'utils/getErrorMessage'
import { DB_NAME, DB_STATE_TABLE, DB_VERSION, SESSION_REDUCER, SYNC_KEY } from 'utils/constants'
import { checkSessionStatus, replaceSession } from 'state/slices/session'
import { SessionReducerStateV2, SessionDataV2 } from 'api/types'
import { SessionDataValidatorManifestV2 } from 'utils/validators'
import { type StoreType } from 'state'
import { setMigrationStatus } from 'state/slices/migration'
import { migrateGeneralSettings } from './migrateGeneralSettings'
import { migrateBlockerSettings } from './migrateBlockerSettings'

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

    // first run of the migration
    if (!migration) {
      const db = new Dexie(DB_NAME)

      db.version(DB_VERSION).stores({
        WS_STATE: 'reducer',
        WS_LOGS: '++id, [timestamp+activity]',
      })

      const data: SessionReducerStateV2 = await db
        .table(DB_STATE_TABLE)
        .get(SYNC_KEY + SESSION_REDUCER)

      await pushToDebugLog({
        level: 'INFO',
        message: 'Session data from indexedDB for extension manifest v2',
        data,
        tag: 'background',
      })

      await pushToDebugLog({
        level: 'INFO',
        message: 'Manifest V3 extension state BEFORE migration',
        data: JSON.stringify(store.getState()),
        tag: 'background',
      })

      if (data && data.state && data.reducer) {
        // zod will strip unrecognized keys from the object being validated
        const parsedSessionStateV2 = SessionDataValidatorManifestV2.safeParse(data.state)

        if (parsedSessionStateV2.success) {
          if (
            parsedSessionStateV2.data.error === null &&
            parsedSessionStateV2.data.loading === false &&
            !parsedSessionStateV2.data.username
          ) {
            await pushToDebugLog({
              level: 'INFO',
              message: 'User is logged out, skipping migration',
              data: JSON.stringify(parsedSessionStateV2.data),
              tag: 'background',
            })
            return
          }

          // dont pass loading or error
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { loading, error, ...rest } = data.state

          // apply migration
          await store.dispatch(
            replaceSession({
              //  fix for type mismatch
              ...(rest as unknown as SessionDataV2),
            }),
          )

          // only migrate other settings if there is a valid session
          await migrateGeneralSettings(db, store)
          await migrateBlockerSettings(db, store)
          await store.dispatch(setMigrationStatus({ migrationId: MIGRATION_ID, completed: true }))
          await store.dispatch(checkSessionStatus())

          await pushToDebugLog({
            level: 'INFO',
            message: 'Migration completed',
            data: JSON.stringify(store.getState().session),
            tag: 'background',
          })
        } else {
          const message = getErrorMessage(parsedSessionStateV2.error)
          pushToDebugLog({
            level: 'ERROR',
            message,
            data: JSON.stringify(parsedSessionStateV2.error),
            tag: 'background',
          })
        }
      } else {
        await pushToDebugLog({
          level: 'INFO',
          message: `Session reducer not found`,
          tag: 'background',
        })
      }
    } else {
      await pushToDebugLog({
        level: 'INFO',
        message: `Migration already performed`,
        data: JSON.stringify(migration),
        tag: 'background',
      })
    }
  } catch (err) {
    const message = getErrorMessage(err)
    pushToDebugLog({
      level: 'ERROR',
      message,
      data: JSON.stringify(err),
      tag: 'background',
    })
  }
}

export { runMigrationFromManifestV2ToV3 }
