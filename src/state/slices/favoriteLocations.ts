import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit'
import type { ServerList, DataCenter } from 'api/types'
import type { RootState } from '../store'

type FavoriteLocationsState = DataCenter[]

const initialState: FavoriteLocationsState = []

export const favoriteLocationsSlice = createSlice({
  name: 'favoriteLocations',
  initialState,
  reducers: {
    addLocationToFavorite(state: FavoriteLocationsState, action: PayloadAction<DataCenter>) {
      state.push(action.payload)
    },
    removeLocationFromFavorite(state: FavoriteLocationsState, action: PayloadAction<number>) {
      return state.filter(location => location.id !== action.payload)
    },
    refreshFavorites(state: FavoriteLocationsState, action: PayloadAction<ServerList>) {
      const dataCenters = action.payload.flatMap(location => location.groups)
      dataCenters.forEach(dataCenter => {
        const index = state.findIndex(favoriteLocation => dataCenter.id === favoriteLocation.id)
        if (index >= 0) state[index] = dataCenter
      })
    },
  },
})

export const selectIsInFavorite = createSelector(
  (state: RootState) => state.favoriteLocations,
  (_: RootState, id: number) => id,
  (favoriteLocations: DataCenter[], id: number): boolean => {
    return !!favoriteLocations.find(location => location.id === id)
  },
)

export const { addLocationToFavorite, removeLocationFromFavorite, refreshFavorites } =
  favoriteLocationsSlice.actions
export default favoriteLocationsSlice.reducer
