import { createSlice, Dictionary, type PayloadAction } from '@reduxjs/toolkit'
import { pushToDebugLog } from 'services/debugLog'

export type MigrationStatus = 'started' | 'failed' | 'completed'
interface Migration {
  id: string
  status: MigrationStatus
  startedAt: string
  ua: string
  endedAt?: string
  preMigrationStorage?: number
  postMigrationStorage?: number
  error?: string
  userStateMigrations?: Dictionary<{
    username?: string
    idOrHash: string
    migratedStates: string[]
  }>
  userHashesAndIdsFound?: string[]
  extensionPreviousVersion?: string
  extensionCurrentVersion?: string
}

interface MigrationsState {
  migrations: Migration[]
}

const initialState: MigrationsState = {
  migrations: [],
}

export type AllPossibleMigratedStates =
  | 'locationLoad'
  | 'allowSystemNotifications'
  | 'showDebugContextMenu'
  | 'languageWarp'
  | 'locationWarp'
  | 'workerBlock'
  | 'timeWarp'
  | 'webRtcBlocker'
  | 'splitPersonality'
  | 'notificationBlocker'
  | 'smokeWall'
  | 'autoConnect'
  | 'proxyPort'
  | 'failOver'
  | 'allowlist'
  | 'theme'
  | 'firstInstallDate'
  | 'locationSorting'
  | 'newsfeedViewed'
  | 'favouriteLocations'
  | 'currentLocation'
  | 'proxyStatusMV2'
  | 'blockList'

export type AddUserStateMigrationPayload = {
  migrationId: string
  username?: string
  idOrHash: string
  migratedStates: AllPossibleMigratedStates[]
}

export type MigratedUserIdentifierArg = Omit<
  AddUserStateMigrationPayload,
  'migrationId' | 'migratedStates'
>

export const migrationSlice = createSlice({
  name: 'migrations',
  initialState,
  reducers: {
    createMigrationEntry: (
      state,
      action: PayloadAction<{
        id: string
        changes: Partial<Omit<Migration, 'id' | 'startedAt' | 'status'>>
      }>,
    ) => {
      const id = action.payload.id
      const existingMigration = state.migrations.find(m => m.id === id)
      if (existingMigration) {
        pushToDebugLog({
          message: `Migration with id: ${id} already exists.`,
          tag: 'background',
          level: 'WARN',
        })
        return
      }

      state.migrations.push({
        id: action.payload.id,
        startedAt: new Date().toUTCString(),
        status: 'started',
        ua: navigator.userAgent,
        ...action.payload.changes,
      })
    },

    addUserStateMigration: (state, action: PayloadAction<AddUserStateMigrationPayload>) => {
      const { migrationId, username, idOrHash, migratedStates } = action.payload
      const migrationIndex = state.migrations.findIndex(m => m.id === migrationId)

      if (migrationIndex !== -1) {
        const migration = state.migrations[migrationIndex]

        // Ensure userStateMigrations is initialized
        if (!migration.userStateMigrations) {
          migration.userStateMigrations = {}
        }

        const key = idOrHash

        if (!migration.userStateMigrations[key]) {
          migration.userStateMigrations[key] = {
            username,
            idOrHash: key,
            migratedStates, // Directly assign the migratedStates
          }
        } else {
          // Directly append migratedStates without checking for duplicates
          migration.userStateMigrations[key]?.migratedStates.push(...migratedStates)
        }
      } else {
        pushToDebugLog({
          message: `Migration with id: ${migrationId} not found for adding user state migration.`,
          tag: 'background',
          level: 'WARN',
        })
      }
    },

    // this is not just for ids, stashed user data does not contain the users
    // id directly but indirectly in the hash. i.e user id is md5 hashed
    addFoundUserIds: (
      state,
      action: PayloadAction<{ migrationId: string; userHashesAndIdsFound: string[] }>,
    ) => {
      const { migrationId, userHashesAndIdsFound } = action.payload
      const migrationIndex = state.migrations.findIndex(m => m.id === migrationId)

      if (migrationIndex !== -1) {
        const migration = state.migrations[migrationIndex]

        // Ensure that userHashesAndIdsFound is initialized
        if (!migration.userHashesAndIdsFound) {
          migration.userHashesAndIdsFound = []
        }

        migration.userHashesAndIdsFound.push(...userHashesAndIdsFound)
      }
    },

    updateMigrationEntry: (
      state,
      action: PayloadAction<{
        migrationId: string
        changes: Partial<Omit<Migration, 'id'>>
      }>,
    ) => {
      const { migrationId, changes } = action.payload
      const migrationIndex = state.migrations.findIndex(m => m.id === migrationId)

      if (migrationIndex !== -1) {
        console.log(state.migrations[migrationIndex])
        state.migrations[migrationIndex] = {
          ...state.migrations[migrationIndex],
          ...changes,
        }
      } else {
        pushToDebugLog({
          message: `Migration with id: ${migrationId} not found.`,
          tag: 'background',
          level: 'WARN',
        })
      }
    },
  },
})

export const {
  createMigrationEntry,
  updateMigrationEntry,
  addFoundUserIds,
  addUserStateMigration,
} = migrationSlice.actions
export default migrationSlice.reducer
