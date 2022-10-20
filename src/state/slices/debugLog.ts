import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LogInfo } from 'utils/types'

interface ConnectionState {
  log: string[]
}

const initialState: ConnectionState = {
  log: [],
}

export const BUILD_LOG_ITEM = 'servers/buildLogItem'

export const debugLogSlice = createSlice({
  name: 'debugLog',
  initialState,
  reducers: {
    pushToDebugLog(state, action: PayloadAction<LogInfo>) {
      const logItem = `${new Date().toLocaleString()} [${action.payload.tag || 'popup'}] [${
        action.payload.level || 'INFO'
      }] ${action.payload.message}\n`

      state.log = [...state.log, logItem]
    },
    clearDebugLog(state) {
      state.log = []
    },
  },
})

export const { pushToDebugLog, clearDebugLog } = debugLogSlice.actions
export default debugLogSlice.reducer
