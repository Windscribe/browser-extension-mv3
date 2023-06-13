// import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
// import { LogItem } from 'utils/types'

// type DebugLogState = LogItem[]

// const initialState: DebugLogState = []

// export const debugLogSlice = createSlice({
//   name: 'debugLog',
//   initialState,
//   reducers: {
//     // pushToDebugLog(state, action: PayloadAction<LogItem>) {
//     //   const { tag = 'popup', level = 'INFO', message, data } = action.payload

//     //   const logItem = {
//     //     // TODO Consider refactoring. Using Date is a side effect.
//     //     // Having a side effect inside a reducer is an antipattern
//     //     date: new Date().toLocaleString(),
//     //     tag,
//     //     level,
//     //     message,
//     //     data,
//     //   }
//     //   state.push(logItem)
//     // },
//     clearDebugLog() {
//       return []
//     },
//   },
// })

// export function parseLogToStrings(log: LogItem[]): string[] {
//   return log.map(logItem => {
//     const { date, tag, level, message, data } = logItem
//     let s = `${date} [${tag}] [${level}] ${message}.\n`
//     if (data) s = s.replace('\n', ` [Data]: ${JSON.stringify(data)}. \n`)
//     return s
//   })
// }

// export const { clearDebugLog } = debugLogSlice.actions
// export default debugLogSlice.reducer
