import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { LogItem } from 'utils/types'

type DebugLogState = LogItem[]

const initialState: DebugLogState = []

export const debugLogSlice = createSlice({
  name: 'debugLog',
  initialState,
  reducers: {
    pushToDebugLog(state, action: PayloadAction<LogItem>) {
      const { tag = 'popup', level = 'INFO', message, data } = action.payload

      const logItem = {
        date: new Date().toLocaleString(),
        tag,
        level,
        message,
        data,
      }
      state.push(logItem)
    },
    clearDebugLog() {
      return []
    },
  },
})

export function parseLogToStrings(log: LogItem[]): string[] {
  return log.map(logItem => {
    const { date, tag, level, message, data } = logItem
    return `${date} [${tag}] [${level}] ${message}. [Data]: ${JSON.stringify(data)} \n`
  })
}

export const { pushToDebugLog, clearDebugLog } = debugLogSlice.actions
export default debugLogSlice.reducer
