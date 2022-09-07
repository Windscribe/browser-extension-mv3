import { configureStore } from '@reduxjs/toolkit'
import exampleReducer, { create } from './slices/example'
import viewReducer, { create as createView } from './slices/view'
import sessionReducer, { create as createSession } from './slices/session'
import serverListReducer, { create as createServerList } from './slices/serverList'

export function buildFrom(initialState?: RootState): StoreType {
  // TODO  Make it iterate through all slices when we create more of them
  const exampleReducer = create(initialState?.example).reducer
  const viewReducer = createView(initialState?.view).reducer
  const sessionReducer = createSession(initialState?.session).reducer
  const serverListReducer = createServerList(initialState?.serverList).reducer

  const reducer = {
    example: exampleReducer,
    view: viewReducer,
    session: sessionReducer,
    serverList: serverListReducer,
  }
  return configureStore({ reducer })
}

const reducer = {
  example: exampleReducer,
  view: viewReducer,
  session: sessionReducer,
  serverList: serverListReducer,
}

const store = configureStore({
  reducer: reducer,
})

export type StoreType = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
