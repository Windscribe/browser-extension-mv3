import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type IsOnlineState = boolean
// always assume online first
// https://issues.chromium.org/issues/338514113
// useQuery and useSWR both OSS default to true when checking if network is online due
// the above bug, although we do check and set this on startup and when service worker is initialized
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
