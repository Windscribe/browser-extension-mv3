import { createSlice, type PayloadAction, type ActionCreatorWithoutPayload } from '@reduxjs/toolkit'

import type * as Containers from 'views'

export type View = keyof typeof Containers
export interface ViewState {
  previous: View[]
  current: View
}

const initialState: ViewState = {
  previous: [],
  current: 'SplashPage',
}

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    set(state, action: PayloadAction<View>) {
      // probably not going back more than 3 times
      // can always increase later if necessary
      state.previous = [...state.previous.slice(-3), state.current]
      state.current = action.payload
    },
    back(state) {
      const { previous } = state
      state.current = previous.pop() ?? initialState.current
    },
    reset(_) {
      return initialState
    },
  },
})

export const { back, set, reset } = viewSlice.actions
export default viewSlice.reducer
