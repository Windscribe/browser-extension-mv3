import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type DismissedUpgradeWarningState = boolean

const initialState: DismissedUpgradeWarningState = false

export const dismissedUpgradeWarningSlice = createSlice({
  name: 'dismissedUpgradeWarning',
  initialState,
  reducers: {
    setDismissedUpgradeWarning(
      state: DismissedUpgradeWarningState,
      action: PayloadAction<boolean>,
    ) {
      return action.payload
    },
  },
})

export const { setDismissedUpgradeWarning } = dismissedUpgradeWarningSlice.actions
export default dismissedUpgradeWarningSlice.reducer
