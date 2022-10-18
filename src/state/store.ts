import { configureStore, combineReducers, type Reducer, type AnyAction } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { alias } from '@eduardoac-skimlinks/webext-redux'

import viewReducer from './slices/view'
import proxyReducer from './slices/proxy'
import sessionReducer from './slices/session'
import serversReducer from './slices/servers'
import bestLocationReducer from './slices/bestLocation'
import currentLocationReducer from './slices/currentLocation'
import currentDataCenterReducer from './slices/currentDataCenter'
import aliases from './aliases'

const reducers = {
  view: viewReducer,
  proxy: proxyReducer,
  session: sessionReducer,
  servers: serversReducer,
  bestLocation: bestLocationReducer,
  currentLocation: currentLocationReducer,
  currentDataCenter: currentDataCenterReducer,
}

const combinedReducer = combineReducers(reducers)

// Here is a place for logic that mutates all state entirely, not just one slice
export const RESET_STORE = 'global/resetStore'
const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === RESET_STORE) {
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
