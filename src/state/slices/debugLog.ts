import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConnectionState {
  log: string[]
}

const initialState: ConnectionState = {
  log: [],
}

export const debugLogSlice = createSlice({
  name: 'debugLog',
  initialState,
  reducers: {
    pushToDebugLog(state, action: PayloadAction<string>) {
      state.log.push(action.payload)
    },
    clearDebugLog(state) {
      state.log = []
    },
  },
})

export const { pushToDebugLog, clearDebugLog } = debugLogSlice.actions
export default debugLogSlice.reducer
