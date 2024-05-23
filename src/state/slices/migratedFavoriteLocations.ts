import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type MigratedFavoriteLocationsState = {
  isMigrated: boolean
  favouriteLocationIds: number[]
}

const initialState: MigratedFavoriteLocationsState = {
  isMigrated: false,
  favouriteLocationIds: [],
}

export const migratedFavoriteLocationsSlice = createSlice({
  name: 'migratedFavoriteLocation',
  initialState,
  reducers: {
    saveFavouriteLocationId(state: MigratedFavoriteLocationsState, action: PayloadAction<number>) {
      state.favouriteLocationIds.push(action.payload)
      return state
    },

    setFavouriteLocationMigrationStatus(state: MigratedFavoriteLocationsState) {
      state.isMigrated = true
      return state
    },
  },
})

export const { saveFavouriteLocationId, setFavouriteLocationMigrationStatus } =
  migratedFavoriteLocationsSlice.actions
export default migratedFavoriteLocationsSlice.reducer
