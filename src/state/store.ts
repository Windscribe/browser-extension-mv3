import { configureStore, combineReducers, type Reducer, type AnyAction } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { alias } from '@eduardoac-skimlinks/webext-redux'

import aliases from './aliases'
import viewReducer from './slices/view'
import proxyReducer from './slices/proxy'
import sessionReducer from './slices/session'
import serversReducer from './slices/servers'
import debugLogReducer from './slices/debugLog'
import autopilotReducer from './slices/autopilot'
import connectionReducer from './slices/connection'
import contextMenuReducer from './slices/contextMenu'
import bestLocationReducer from './slices/bestLocation'
import currentLocationReducer from './slices/currentLocation'
import currentDataCenterReducer from './slices/currentDataCenter'

const reducers = {
  autopilot: autopilotReducer,
  bestLocation: bestLocationReducer,
  connection: connectionReducer,
  contextMenu: contextMenuReducer,
  currentDataCenter: currentDataCenterReducer,
  currentLocation: currentLocationReducer,
  debugLog: debugLogReducer,
  proxy: proxyReducer,
  servers: serversReducer,
  session: sessionReducer,
  view: viewReducer,
}

const combinedReducer = combineReducers(reducers)

// Here is a place for logic that mutates all state entirely, not just one slice
const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  if (action.type === 'global/resetStore') {
    state = {} as RootState
  }
  return combinedReducer(state, action)
}

const store = configureStore({
  reducer: rootReducer,
})

const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry?.error,
})

export function buildFrom(preloadedState?: RootState): StoreType {
  return configureStore({
    reducer: rootReducer,
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
export type RootState = ReturnType<typeof combinedReducer>
export type AppDispatch = typeof store.dispatch

export default store
