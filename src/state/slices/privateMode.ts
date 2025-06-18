import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type PrivateModeModalShownState = boolean
const initialState: PrivateModeModalShownState = false

export const privateModeModalShownSlice = createSlice({
  name: 'privateModeModalShown',
  initialState,
  reducers: {
    setPrivateModeModalShown(state: PrivateModeModalShownState, action: PayloadAction<boolean>) {
      return action.payload
    },
  },
})

export const { setPrivateModeModalShown } = privateModeModalShownSlice.actions
export default privateModeModalShownSlice.reducer
