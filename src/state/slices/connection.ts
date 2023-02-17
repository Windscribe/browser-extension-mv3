import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { type FailoverOption } from 'utils/types'

interface ConnectionState {
  smokeWall: boolean
  failover: FailoverOption
  autoConnect: boolean
  reconnectionAttempts: number
}

const initialState: ConnectionState = {
  smokeWall: true,
  failover: 'Auto / Best',
  autoConnect: false,
  reconnectionAttempts: 0,
}

export const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setSmokeWall(state, action: PayloadAction<boolean>) {
      state.smokeWall = action.payload
    },
    setFailover(state, action: PayloadAction<FailoverOption>) {
      state.failover = action.payload
    },
    setAutoConnect(state, action: PayloadAction<boolean>) {
      state.autoConnect = action.payload
    },
    setReconnectionAttempts(state, action: PayloadAction<number>) {
      state.reconnectionAttempts = action.payload
    },
  },
})

export const { setSmokeWall, setFailover, setAutoConnect, setReconnectionAttempts } =
  connectionSlice.actions
export default connectionSlice.reducer
