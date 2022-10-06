import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConnectionState {
  failover: string
}

const initialState: ConnectionState = {
  failover: 'Auto / Best',
}

export const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setFailover(state, action: PayloadAction<string>) {
      state.failover = action.payload
    },
  },
})

export const { setFailover } = connectionSlice.actions
export default connectionSlice.reducer
