import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type ShouldShowOnboardingState = boolean
const initialState: ShouldShowOnboardingState = false

export const shouldShowOnboardingSlice = createSlice({
  name: 'shouldShowOnboarding',
  initialState,
  reducers: {
    setShouldShowOnboarding(state: ShouldShowOnboardingState, action: PayloadAction<boolean>) {
      return action.payload
    },
  },
})

export const { setShouldShowOnboarding } = shouldShowOnboardingSlice.actions
export default shouldShowOnboardingSlice.reducer
