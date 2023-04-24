import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type TimeWarpEnabledState = boolean
const initialState: TimeWarpEnabledState = false

export const timeWarpEnabledSlice = createSlice({
  name: 'timeWarpEnabled',
  initialState,
  reducers: {
    setTimeWarpEnabled(state: TimeWarpEnabledState, action: PayloadAction<boolean>) {
      return action.payload
    },
  },
})

export const { setTimeWarpEnabled } = timeWarpEnabledSlice.actions
export default timeWarpEnabledSlice.reducer
