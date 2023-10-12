import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type View } from 'utils/types'

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
    setView(state, action: PayloadAction<View>) {
      // probably not going back more than 3 times
      // can always increase later if necessary
      state.previous = [...state.previous.slice(-3), state.current]
      state.current = action.payload
    },
    back(state) {
      const { previous } = state
      state.current = previous.pop() ?? initialState.current
    },
    resetView() {
      return initialState
    },
  },
})

export const { back, setView, resetView } = viewSlice.actions
export default viewSlice.reducer
