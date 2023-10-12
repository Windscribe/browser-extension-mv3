import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { addContextMenuItem, removeContextMenuItem } from 'services/contextMenu'

type ContextMenuState = boolean
const initialState: ContextMenuState = true

export const contextMenuSlice = createSlice({
  name: 'contextMenu',
  initialState,
  reducers: {
    showDebugContextMenu(state: ContextMenuState, action: PayloadAction<boolean>) {
      if (action.payload) {
        addContextMenuItem()
      } else {
        removeContextMenuItem()
      }
      return action.payload
    },
  },
})

export const { showDebugContextMenu } = contextMenuSlice.actions
export default contextMenuSlice.reducer
