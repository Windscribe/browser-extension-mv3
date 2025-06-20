import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type SplitPersonalityCompatModeState = boolean
const initialState: SplitPersonalityCompatModeState = false

export const splitPersonalityCompatModeSlice = createSlice({
  name: 'splitPersonalityCompatMode',
  initialState,
  reducers: {
    setSplitPersonalityCompatMode(
      state: SplitPersonalityCompatModeState,
      action: PayloadAction<boolean>,
    ) {
      return action.payload
    },
  },
})

export const { setSplitPersonalityCompatMode } = splitPersonalityCompatModeSlice.actions
export default splitPersonalityCompatModeSlice.reducer
