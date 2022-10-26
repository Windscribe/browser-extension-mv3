import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { type FailoverOption } from 'utils/types'

interface ConnectionState {
  failover: FailoverOption
  autoConnect: boolean
}

const initialState: ConnectionState = {
  failover: 'Auto / Best',
  autoConnect: false,
}

export const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setFailover(state, action: PayloadAction<FailoverOption>) {
      state.failover = action.payload
    },
    setAutoConnect(state, action: PayloadAction<boolean>) {
      state.autoConnect = action.payload
    },
  },
})

export const { setFailover, setAutoConnect } = connectionSlice.actions
export default connectionSlice.reducer
