import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LogItem } from 'utils/types'

interface DebugLogState {
  log: string[]
}

// TODO refactor and remove log
const initialState: DebugLogState = {
  log: [],
}

export const debugLogSlice = createSlice({
  name: 'debugLog',
  initialState,
  reducers: {
    pushToDebugLog(state, action: PayloadAction<LogItem>) {
      const { tag, level, message, data } = action.payload

      let logItem = `${new Date().toLocaleString()} [${tag || 'popup'}] [${
        level || 'INFO'
      }] ${message}.`

      if (action.payload.hasOwnProperty('data')) {
        logItem += ` [Data]: ${JSON.stringify(data)}`
      }
      logItem += '\n'

      state.log = [...state.log, logItem]
    },
    clearDebugLog(state) {
      state.log = []
    },
  },
})

export const { pushToDebugLog, clearDebugLog } = debugLogSlice.actions
export default debugLogSlice.reducer
