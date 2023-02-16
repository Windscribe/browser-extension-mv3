import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type LocationWarpState = boolean
const initialState: LocationWarpState = false

export const locationWarpSlice = createSlice({
  name: 'locationWarp',
  initialState,
  reducers: {
    setLocationWarp(state: LocationWarpState, action: PayloadAction<boolean>) {
      return action.payload
    },
  },
})

export const { setLocationWarp } = locationWarpSlice.actions
export default locationWarpSlice.reducer
