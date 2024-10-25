import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type ShowReloadAlert = boolean
const initialState: ShowReloadAlert = false

export const ShowReloadAlertSlice = createSlice({
  name: 'showReloadAlert',
  initialState,
  reducers: {
    setShouldShowReloadAlert(state: ShowReloadAlert, action: PayloadAction<boolean>) {
      return action.payload
    },
  },
})

export const { setShouldShowReloadAlert } = ShowReloadAlertSlice.actions
export default ShowReloadAlertSlice.reducer
