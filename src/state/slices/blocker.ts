import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type BlockerState = string[]
const initialState: BlockerState = ['default']

export const blockerSlice = createSlice({
  name: 'blocker',
  initialState,
  reducers: {
    setBlocker(state, action: PayloadAction<string[]>) {
      state = action.payload
    },
  },
})

export const { setBlocker } = blockerSlice.actions
export default blockerSlice.reducer
