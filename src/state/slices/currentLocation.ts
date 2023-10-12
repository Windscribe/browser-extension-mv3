import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { Location } from 'api/types'

const initialState: Partial<Location> = {}

export const currentLocationSlice = createSlice({
  name: 'currentLocation',
  initialState,
  reducers: {
    setCurrentLocation(state, action: PayloadAction<Location>) {
      return { ...state, ...action.payload }
    },
  },
})

export const { setCurrentLocation } = currentLocationSlice.actions
export default currentLocationSlice.reducer
