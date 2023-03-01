import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type AllowSystemNotificationsState = boolean
const initialState: AllowSystemNotificationsState = true

export const allowSystemNotificationsSlice = createSlice({
  name: 'allowSystemNotifications',
  initialState,
  reducers: {
    setAllowSystemNotifications(
      state: AllowSystemNotificationsState,
      action: PayloadAction<boolean>,
    ) {
      return action.payload
    },
  },
})

export const { setAllowSystemNotifications } = allowSystemNotificationsSlice.actions
export default allowSystemNotificationsSlice.reducer
