import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { alias } from '@eduardoac-skimlinks/webext-redux'

import viewReducer from './slices/view'
import proxyReducer from './slices/proxy'
import sessionReducer from './slices/session'
import serversReducer from './slices/servers'
import bestLocationReducer from './slices/bestLocation'
import currentLocationReducer from './slices/currentLocation'
import currentDataCenterReducer from './slices/currentDataCenter'
import aliases from './aliases'
import connectionReducer from './slices/connection'
import debugLogReducer from './slices/debugLog'

const reducer = {
  view: viewReducer,
  proxy: proxyReducer,
  session: sessionReducer,
  servers: serversReducer,
  bestLocation: bestLocationReducer,
  currentLocation: currentLocationReducer,
  currentDataCenter: currentDataCenterReducer,
  connection: connectionReducer,
  debugLog: debugLogReducer,
}

const store = configureStore({
  reducer: reducer,
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
