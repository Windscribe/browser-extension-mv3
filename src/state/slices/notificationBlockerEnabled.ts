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
      await dispatch(resetNotificationBlocker())
    } else {
      await dispatch(enableBlockNotifications())
    }
  },
)

export const resetNotificationBlocker = createAsyncThunk(
  'notificationBlockerEnabled/reset',
  async (_, { dispatch }) => {
    await resetNotificationSettings()
    dispatch(setNotificationBlockerEnabled(false))
  },
)

export const enableBlockNotifications = createAsyncThunk(
  'notificationBlockerEnabled/enableBlock',
  async (_, { dispatch }) => {
    await blockNotifications()
    dispatch(setNotificationBlockerEnabled(true))
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
