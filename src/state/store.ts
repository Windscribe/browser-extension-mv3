import { configureStore } from '@reduxjs/toolkit'
import exampleReducer, { create } from './slices/example'
import viewReducer, { create as createView } from './slices/view'

export function buildFrom(initialState?: RootState): StoreType {
  // TODO  Make it iterate through all slices when we create more of them
  const exampleReducer = create(initialState?.example).reducer
  const viewReducer = createView(initialState?.view).reducer

  const reducer = {
    example: exampleReducer,
    view: viewReducer,
  }
  return configureStore({ reducer })
}

const reducer = {
  example: exampleReducer,
  view: viewReducer,
}

const store = configureStore({
  reducer: reducer,
})

export type StoreType = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
