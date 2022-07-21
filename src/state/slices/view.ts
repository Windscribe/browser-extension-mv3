import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type * as Containers from 'views'

export type View = keyof typeof Containers
interface ViewState {
  previous: View[]
  current: View
}

const defaultState: ViewState = {
  previous: [],
  //current: 'SplashPage',
  current: 'Signup',
}

export const create = (initialState?: ViewState) =>
  createSlice({
    name: 'view',
    initialState: defaultState,
    reducers: {
      set(state, action: PayloadAction<View>) {
        // probably not going back more than 3 times
        // can always increase later if necessary
        state.previous = [...state.previous.slice(-3), state.current]
        state.current = action.payload
      },
      back(state) {
        const { previous } = state
        previous.pop()
        state.current = previous[previous.length - 1]
      },
    },
  })

const viewSlice = create()
export const { set, back } = viewSlice.actions
export default viewSlice.reducer
