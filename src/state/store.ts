import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { alias } from '@eduardoac-skimlinks/webext-redux'

import aliases from './aliases'
import viewReducer from './slices/view'
import proxyReducer from './slices/proxy'
import sessionReducer from './slices/session'
import serversReducer from './slices/servers'
import autopilotReducer from './slices/autopilot'
import connectionReducer from './slices/connection'
import bestLocationReducer from './slices/bestLocation'
import currentLocationReducer from './slices/currentLocation'
import currentDataCenterReducer from './slices/currentDataCenter'

const reducer = {
  autopilot: autopilotReducer,
  bestLocation: bestLocationReducer,
  connection: connectionReducer,
  currentDataCenter: currentDataCenterReducer,
  currentLocation: currentLocationReducer,
  proxy: proxyReducer,
  servers: serversReducer,
  session: sessionReducer,
  view: viewReducer,
}

const store = configureStore({
  reducer: reducer,
})

const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry?.error,
})

export function buildFrom(preloadedState?: RootState): StoreType {
  return configureStore({
    reducer,
    preloadedState,
    middleware: getDefaultMiddleware => {
      const arr = [alias(aliases), ...getDefaultMiddleware()]
      if (process.env.NODE_ENV === 'development') {
        arr.push(logger)
      }
      return arr
    },
  })
}

export type StoreType = typeof store
export type GetState = typeof store.getState
export type RootState = ReturnType<GetState>
export type AppDispatch = typeof store.dispatch

export default store
