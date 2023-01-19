import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

import { pushToDebugLog } from './debugLog'
import { setRandomSpoofedUserAgent } from './userAgent'
import { addTabEventsHandler, removeTabEventsHandler } from 'services/userAgent/rewriteUserAgent'
import {
  spoofUserAgentHeader,
  resetSpoofUserAgentHeader,
} from 'services/declarativeNetRequest/updateDynamicRules'

type SplitPersonalityEnabledState = boolean
const initialState: SplitPersonalityEnabledState = false

export const toggleSplitPersonality = createAsyncThunk(
  'splitPersonalityEnabled/toggle',
  async (_, { dispatch, getState }) => {
    const isEnabled = getState().splitPersonalityEnabled
    if (isEnabled) {
      await dispatch(deactivateSplitPersonality())
    } else {
      await dispatch(activateSplitPersonality())
    }
  },
)

export const deactivateSplitPersonality = createAsyncThunk(
  'splitPersonalityEnabled/deactivate',
  async (_, { dispatch }) => {
    try {
      removeTabEventsHandler()
      await resetSpoofUserAgentHeader()
      dispatch(setSplitPersonalityEnabled(false))
    } catch (err) {
      const { cause, message } = err as Error
      dispatch(pushToDebugLog({ level: 'ERROR', message: message, data: JSON.stringify(cause) }))
      // TODO show Error message for user on Privacy page?
    }
  },
)

export const activateSplitPersonality = createAsyncThunk(
  'splitPersonalityEnabled/activate',
  async (_, { dispatch, getState }) => {
    try {
      let spoofedUserAgent = getState().userAgent.spoofed

      if (!spoofedUserAgent) {
        dispatch(setRandomSpoofedUserAgent())
        spoofedUserAgent = getState().userAgent.spoofed
      }

      addTabEventsHandler(spoofedUserAgent)
      await spoofUserAgentHeader(spoofedUserAgent)
      dispatch(setSplitPersonalityEnabled(true))
    } catch (err) {
      const { cause, message } = err as Error
      dispatch(pushToDebugLog({ level: 'ERROR', message: message, data: JSON.stringify(cause) }))
      // TODO show Error message for user on Privacy page?
    }
  },
)

export const splitPersonalityEnabledSlice = createSlice({
  name: 'splitPersonalityEnabled',
  initialState,
  reducers: {
    setSplitPersonalityEnabled(
      state: SplitPersonalityEnabledState,
      action: PayloadAction<boolean>,
    ) {
      return action.payload
    },
  },
})

export const { setSplitPersonalityEnabled } = splitPersonalityEnabledSlice.actions
export default splitPersonalityEnabledSlice.reducer
