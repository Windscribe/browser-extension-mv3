import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type LocationLoadState = boolean
const initialState: LocationLoadState = false

export const locationLoadSlice = createSlice({
  name: 'locationLoad',
  initialState,
  reducers: {
    setLocationLoad(state: LocationLoadState, action: PayloadAction<boolean>) {
      return action.payload
    },
  },
})

export const { setLocationLoad } = locationLoadSlice.actions
export default locationLoadSlice.reducer
