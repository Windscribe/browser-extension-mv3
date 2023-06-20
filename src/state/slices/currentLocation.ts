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
    resetCurrentLocation() {
      return initialState
    },
  },
})

export const { setCurrentLocation, resetCurrentLocation } = currentLocationSlice.actions
export default currentLocationSlice.reducer
