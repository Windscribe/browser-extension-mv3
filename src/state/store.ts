import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { alias } from '@eduardoac-skimlinks/webext-redux'

import viewReducer from './slices/view'
import sessionReducer from './slices/session'
import serversReducer from './slices/servers'
import bestLocationReducer from './slices/bestLocation'
import aliases from './aliases'

const reducer = {
  view: viewReducer,
  session: sessionReducer,
  servers: serversReducer,
  bestLocation: bestLocationReducer,
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
