import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface BlockerState {
  blockLists: string[]
}

const initialState: BlockerState = {
  blockLists: ['default', 'block-lan'],
}

export const blockerSlice = createSlice({
  name: 'blocker',
  initialState,
  reducers: {
    setBlockLists(state, action: PayloadAction<string[]>) {
      state.blockLists = action.payload
    },
  },
})

export const { setBlockLists } = blockerSlice.actions
export default blockerSlice.reducer
