import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type UrlCleanerEnabledState = boolean
const initialState: UrlCleanerEnabledState = true

export const urlCleanerEnabledSlice = createSlice({
  name: 'urlCleanerEnabled',
  initialState,
  reducers: {
    setUrlCleanerEnabled(state: UrlCleanerEnabledState, action: PayloadAction<boolean>) {
      return action.payload
    },
  },
})

export const { setUrlCleanerEnabled } = urlCleanerEnabledSlice.actions
export default urlCleanerEnabledSlice.reducer
