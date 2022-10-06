import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import viewReducer from './slices/view'
import sessionReducer from './slices/session'
import serversReducer from './slices/servers'
import bestLocationReducer from './slices/bestLocation'

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
      const arr = [...getDefaultMiddleware()]
      if (process.env.NODE_ENV === 'development') {
        arr.push(logger)
      }
      return arr
    },
  })
}

export type StoreType = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
