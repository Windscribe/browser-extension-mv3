import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

import { pushToDebugLog } from 'services/debugLog'
import { setRandomSpoofedUserAgent } from './userAgent'
import {
  spoofUserAgentHeader,
  resetSpoofUserAgentHeader,
} from 'services/declarativeNetRequest/updateDynamicRules'

type SplitPersonalityEnabledState = boolean
const initialState: SplitPersonalityEnabledState = false

export const TOGGLE_SPLIT_PERSONALITY = 'splitPersonalityEnabled/toggle'
export const toggleSplitPersonality = createAsyncThunk(
  TOGGLE_SPLIT_PERSONALITY,
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
      await resetSpoofUserAgentHeader()
      dispatch(setSplitPersonalityEnabled(false))
    } catch (err) {
      const { cause, message } = err as Error
      pushToDebugLog({ level: 'ERROR', message: message, data: JSON.stringify(cause) })
      // TODO show Error message for user on Privacy page?
    }
  },
)

export const ACTIVATE_SPLIT_PERSONALITY = 'splitPersonalityEnabled/activate'
export const activateSplitPersonality = createAsyncThunk(
  ACTIVATE_SPLIT_PERSONALITY,
  async (_, { dispatch, getState }) => {
    try {
      dispatch(setRandomSpoofedUserAgent)
      const spoofedUserAgent = getState().userAgent.spoofed
      await spoofUserAgentHeader(spoofedUserAgent)
      dispatch(setSplitPersonalityEnabled(true))
    } catch (err) {
      const { cause, message } = err as Error
      pushToDebugLog({ level: 'ERROR', message: message, data: JSON.stringify(cause) })
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
