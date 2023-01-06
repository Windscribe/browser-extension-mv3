import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { LocationSorting } from 'utils/types'

export const locationSortingSlice = createSlice({
  name: 'locationSorting',
  initialState: 'geography' as LocationSorting,
  reducers: {
    setLocationSorting(state: LocationSorting, action: PayloadAction<LocationSorting>) {
      return action.payload
    },
  },
})

export const { setLocationSorting } = locationSortingSlice.actions
export default locationSortingSlice.reducer
