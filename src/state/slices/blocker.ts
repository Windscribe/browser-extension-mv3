import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface BlockerState {
  blockLists: string[]
  showUblockWarningAtHomePage: boolean
  showUblockWarningAtBlockerPage: boolean
  showUblockWarningAtLinkSanitizer: boolean
}

export const initialState: BlockerState = {
  blockLists: ['easylist', 'easyprivacy', 'pgl', 'ublock-filters'],
  showUblockWarningAtHomePage: true,
  showUblockWarningAtBlockerPage: true,
  showUblockWarningAtLinkSanitizer: true,
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
    setShowUblockWarningAtLinkSanitizer(state, action: PayloadAction<boolean>) {
      state.showUblockWarningAtLinkSanitizer = action.payload
    },
  },
})

export const {
  setBlockLists,
  setShowUblockWarningAtHomePage,
  setShowUblockWarningAtBlockerPage,
  setShowUblockWarningAtLinkSanitizer,
} = blockerSlice.actions
export default blockerSlice.reducer
