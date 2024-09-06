import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type ShouldShowWelcomeState = boolean
const initialState: ShouldShowWelcomeState = true

export const shouldShowWelcomeSlice = createSlice({
  name: 'shouldShowWelcome',
  initialState,
  reducers: {
    setShouldShowWelcome(state: ShouldShowWelcomeState, action: PayloadAction<boolean>) {
      return action.payload
    },
  },
})

export const { setShouldShowWelcome } = shouldShowWelcomeSlice.actions
export default shouldShowWelcomeSlice.reducer
