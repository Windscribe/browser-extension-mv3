import { createSlice, type PayloadAction, type ActionCreatorWithoutPayload } from '@reduxjs/toolkit'

import { type Create } from './types'
import type * as Containers from 'views'

export type View = keyof typeof Containers
export interface ViewState {
  previous: View[]
  current: View
}

const defaultState: ViewState = {
  previous: [],
  current: 'Login',
}

export const create: Create<ViewState> = initialState =>
  createSlice({
    name: 'view',
    initialState: initialState || defaultState,
    reducers: {
      set(state, action: PayloadAction<View>) {
        // probably not going back more than 3 times
        // can always increase later if necessary
        state.previous = [...state.previous.slice(-3), state.current]
        state.current = action.payload
      },
      back(state) {
        const { previous } = state
        state.current = previous.pop() ?? defaultState.current
      },
      reset(state) {
        state = { ...defaultState }
      },
    },
  })

const viewSlice = create()
const set = viewSlice.actions.set
const back = viewSlice.actions.back as ActionCreatorWithoutPayload
const reset = viewSlice.actions.reset as ActionCreatorWithoutPayload

export { back, set, reset }
export default viewSlice.reducer
