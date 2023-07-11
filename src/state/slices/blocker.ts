import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface BlockerState {
  blockLists: string[]
  showUblockWarning: boolean
}

const initialState: BlockerState = {
  blockLists: ['default'],
  showUblockWarning: true,
}

export const blockerSlice = createSlice({
  name: 'blocker',
  initialState,
  reducers: {
    setBlockLists(state, action: PayloadAction<string[]>) {
      state.blockLists = action.payload
    },
    setShowUblockWarning(state, action: PayloadAction<boolean>) {
      state.showUblockWarning = action.payload
    },
  },
})

export const { setBlockLists, setShowUblockWarning } = blockerSlice.actions
export default blockerSlice.reducer
