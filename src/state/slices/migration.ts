import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Migration {
  id: string
  completed: boolean
  reason?: string
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
    setMigrationStatus: (state, action: PayloadAction<Migration>) => {
      const { id, completed, reason } = action.payload
      const migrationIndex = state.migrations.findIndex(m => m.id === id)
      if (migrationIndex !== -1) {
        state.migrations[migrationIndex].completed = completed
      } else {
        state.migrations.push({ id, completed, reason })
      }
    },
  },
})

export const { setMigrationStatus } = migrationSlice.actions
export default migrationSlice.reducer
