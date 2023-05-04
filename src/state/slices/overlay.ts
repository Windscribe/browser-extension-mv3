import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { OverlayTemplate } from 'utils/types'

type OverlayState = {
  templates: OverlayTemplate[]
}
const initialState: OverlayState = {
  templates: [],
}

export const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    addOverlay(state: OverlayState, action: PayloadAction<OverlayTemplate>) {
      const template = action.payload
      // TODO Consider to make it simpler
      const uniqueValuesArray = [...new Set([...state.templates, template])]
      state.templates = uniqueValuesArray
    },
    removeOverlay(state: OverlayState, action: PayloadAction<OverlayTemplate>) {
      const templateToRemove = action.payload
      state.templates = state.templates.filter(template => template !== templateToRemove)
    },
    removeAllOverlays(state: OverlayState) {
      state.templates = []
    },
  },
})

export const { addOverlay, removeOverlay, removeAllOverlays } = overlaySlice.actions
export default overlaySlice.reducer
