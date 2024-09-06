import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface BlockerState {
  blockLists: string[]
  showUblockWarningAtHomePage: boolean
  showUblockWarningAtBlockerPage: boolean
}

export const initialState: BlockerState = {
  blockLists: ['default'],
  showUblockWarningAtHomePage: true,
  showUblockWarningAtBlockerPage: true,
}

export const blockerSlice = createSlice({
  name: 'blocker',
  initialState,
  reducers: {
    setBlockLists(state, action: PayloadAction<string[]>) {
      state.blockLists = action.payload
    },
    setShowUblockWarningAtHomePage(state, action: PayloadAction<boolean>) {
      state.showUblockWarningAtHomePage = action.payload
    },
    setShowUblockWarningAtBlockerPage(state, action: PayloadAction<boolean>) {
      state.showUblockWarningAtBlockerPage = action.payload
    },
  },
})

export const { setBlockLists, setShowUblockWarningAtHomePage, setShowUblockWarningAtBlockerPage } =
  blockerSlice.actions
export default blockerSlice.reducer
