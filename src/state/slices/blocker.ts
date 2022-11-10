import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BlockerState {
  blocker: boolean
}

const initialState: BlockerState = {
  blocker: true,
}

export const blockerSlice = createSlice({
  name: 'boolean',
  initialState,
  reducers: {
    setBlocker(state, action: PayloadAction<boolean>) {
      state.blocker = action.payload
    },
  },
})

export const { setBlocker } = blockerSlice.actions
export default blockerSlice.reducer
