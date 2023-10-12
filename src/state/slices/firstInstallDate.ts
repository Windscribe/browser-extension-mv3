import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type FirstInstallDateState = number
const initialState: FirstInstallDateState = 0

export const firstInstallDateSlice = createSlice({
  name: 'firstInstallDate',
  initialState,
  reducers: {
    setFirstInstallDate(
      state: FirstInstallDateState,
      action: PayloadAction<FirstInstallDateState>,
    ) {
      return action.payload
    },
  },
})

export const { setFirstInstallDate } = firstInstallDateSlice.actions
export default firstInstallDateSlice.reducer
