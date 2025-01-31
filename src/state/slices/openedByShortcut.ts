import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ShortcutStatusState {
  openedByShortcut: boolean
}

const initialState: ShortcutStatusState = {
  openedByShortcut: false,
}

const openedByShortcutSlice = createSlice({
  name: 'shortcutStatus',
  initialState,
  reducers: {
    setOpenedByShortcut: (state, action: PayloadAction<boolean>) => {
      state.openedByShortcut = action.payload
    },
  },
})

export const { setOpenedByShortcut } = openedByShortcutSlice.actions
export default openedByShortcutSlice.reducer
