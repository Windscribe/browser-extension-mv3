import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type LanguageWarpEnabledState = boolean

const initialState: LanguageWarpEnabledState = false

export const languageWarpEnabledSlice = createSlice({
  name: 'languageWarpEnabled',
  initialState,
  reducers: {
    setLanguageWarpEnabled(state: LanguageWarpEnabledState, action: PayloadAction<boolean>) {
      return action.payload
    },
  },
})

export const { setLanguageWarpEnabled } = languageWarpEnabledSlice.actions
export default languageWarpEnabledSlice.reducer
