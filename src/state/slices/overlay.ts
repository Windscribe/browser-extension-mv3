import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { OverlayTemplate } from 'utils/types'

type OverlayState = {
  isOpen: boolean
  template?: OverlayTemplate
}
const initialState: OverlayState = {
  isOpen: false,
  template: 'somethingWeird',
}

export const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    setOverlay(state: OverlayState, action: PayloadAction<OverlayState>) {
      const { isOpen, template } = action.payload
      state.isOpen = isOpen
      if (template) {
        state.template = template
      }
    },
  },
})

export const { setOverlay } = overlaySlice.actions
export default overlaySlice.reducer
