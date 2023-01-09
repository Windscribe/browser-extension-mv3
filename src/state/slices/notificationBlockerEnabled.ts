import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

import {
  resetNotificationSettings,
  blockNotifications,
} from 'services/contentSettings/notifications'

type NotificationBlockerEnabledState = boolean
const initialState: NotificationBlockerEnabledState = false

export const toggleNotificationBlocker = createAsyncThunk(
  'notificationBlockerEnabled/toggle',
  async (_, { dispatch, getState }) => {
    const isEnabled = getState().notificationBlockerEnabled
    if (isEnabled) {
      await resetNotificationSettings()
    } else {
      await blockNotifications()
    }

    dispatch(setNotificationBlockerEnabled(!isEnabled))
  },
)

export const notificationBlockerEnabledSlice = createSlice({
  name: 'notificationBlockerEnabled',
  initialState,
  reducers: {
    setNotificationBlockerEnabled(
      state: NotificationBlockerEnabledState,
      action: PayloadAction<boolean>,
    ) {
      return action.payload
    },
  },
})

export const { setNotificationBlockerEnabled } = notificationBlockerEnabledSlice.actions
export default notificationBlockerEnabledSlice.reducer
