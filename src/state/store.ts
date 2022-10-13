import { configureStore } from '@reduxjs/toolkit'
import viewReducer from './slices/view'
import sessionReducer from './slices/session'
import serversReducer from './slices/servers'
import connectionReducer from './slices/connection'
import debugLogReducer from './slices/debugLog'

const reducer = {
  view: viewReducer,
  session: sessionReducer,
  servers: serversReducer,
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
  })
}

export type StoreType = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
