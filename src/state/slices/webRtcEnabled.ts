import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

import { pushToDebugLog } from 'services/debugLog'
import { resetWebRtcSettings, blockWebRtc, getWebRtcSettings } from 'services/privacy/network'

type WebRtcEnabledState = boolean
const initialState: WebRtcEnabledState = false

export const toggleWebRtcBlocker = createAsyncThunk(
  'webRtcEnabled/toggle',
  async (_, { dispatch, getState }) => {
    const webRtcSettings = await getWebRtcSettings()
    await pushToDebugLog({ message: 'Current web RTC settings: ', data: webRtcSettings })
    const isEnabled = getState().webRtcEnabled
    if (isEnabled) {
      await dispatch(resetWebRtcBlocker())
    } else {
      await dispatch(enableBlockWebRtc())
    }
  },
)

export const resetWebRtcBlocker = createAsyncThunk(
  'webRtcEnabled/reset',
  async (_, { dispatch }) => {
    await resetWebRtcSettings()
    dispatch(setWebRtcEnabled(false))
  },
)

export const enableBlockWebRtc = createAsyncThunk(
  'webRtcEnabled/enableBlock',
  async (_, { dispatch }) => {
    await blockWebRtc()
    dispatch(setWebRtcEnabled(true))
  },
)

export const webRtcEnabledSlice = createSlice({
  name: 'webRtcEnabled',
  initialState,
  reducers: {
    setWebRtcEnabled(state: WebRtcEnabledState, action: PayloadAction<boolean>) {
      return action.payload
    },
  },
})

export const { setWebRtcEnabled } = webRtcEnabledSlice.actions
export default webRtcEnabledSlice.reducer
