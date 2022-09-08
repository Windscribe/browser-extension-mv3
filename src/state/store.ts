import { configureStore } from '@reduxjs/toolkit'
import viewReducer from './slices/view'
import sessionReducer from './slices/session'
import serverListReducer from './slices/serverList'
import currentLocationReducer from './slices/currentLocation'

const reducer = {
  view: viewReducer,
  session: sessionReducer,
  serverList: serverListReducer,
  currentLocation: currentLocationReducer,
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
