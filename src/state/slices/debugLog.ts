import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LogItem } from 'utils/types'

type DebugLogState = string[]

const initialState: DebugLogState = []

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

      return [...state, logItem]
    },
    clearDebugLog() {
      return []
    },
  },
})

export const { pushToDebugLog, clearDebugLog } = debugLogSlice.actions
export default debugLogSlice.reducer
