import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { type FailoverOption } from 'utils/types'

interface ConnectionState {
  failover: FailoverOption
}

const initialState: ConnectionState = {
  failover: 'Auto / Best',
}

export const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setFailover(state, action: PayloadAction<FailoverOption>) {
      state.failover = action.payload
    },
  },
})

export const { setFailover } = connectionSlice.actions
export default connectionSlice.reducer
