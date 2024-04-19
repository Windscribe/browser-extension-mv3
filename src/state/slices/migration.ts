import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Migration {
  id: string
  completed: boolean
}

interface MigrationsState {
  migrations: Migration[]
}

const initialState: MigrationsState = {
  migrations: [],
}

export const migrationSlice = createSlice({
  name: 'migrations',
  initialState,
  reducers: {
    setMigrationStatus: (
      state,
      action: PayloadAction<{ migrationId: string; completed: boolean }>,
    ) => {
      const { migrationId, completed } = action.payload
      const migrationIndex = state.migrations.findIndex(m => m.id === migrationId)
      if (migrationIndex !== -1) {
        state.migrations[migrationIndex].completed = completed
      } else {
        state.migrations.push({ id: migrationId, completed })
      }
    },
  },
})

export const { setMigrationStatus } = migrationSlice.actions
export default migrationSlice.reducer
