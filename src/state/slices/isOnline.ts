import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type IsOnlineState = boolean
const initialState: IsOnlineState = true

export const isOnlineSlice = createSlice({
  name: 'isOnline',
  initialState,
  reducers: {
    setIsOnline(state: IsOnlineState, action: PayloadAction<boolean>) {
      return action.payload
    },
  },
})

export const { setIsOnline } = isOnlineSlice.actions
export default isOnlineSlice.reducer
