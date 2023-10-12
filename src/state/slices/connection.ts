import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type FailoverOption } from 'utils/types'

interface ConnectionState {
  smokeWall: boolean
  failover: FailoverOption
  autoConnect: boolean
}

const initialState: ConnectionState = {
  smokeWall: true,
  failover: 'Auto / Best',
  autoConnect: true,
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
  },
})

export const { setSmokeWall, setFailover, setAutoConnect } = connectionSlice.actions
export default connectionSlice.reducer
