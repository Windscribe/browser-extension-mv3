import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

import type { Autopilot } from 'api/types'
import { selectLocationByName, findDataCenterById } from '../selectors'
import { FETCH_BEST_LOCATION } from './bestLocation'
import { setCurrentLocation } from './currentLocation'
import { setCurrentDataCenter } from './currentDataCenter'
import { connectProxy } from './proxy'

interface AutopilotState {
  autopilotData?: Autopilot
  autopilotSelected: boolean
  errorMessage?: string
}

const initialState: AutopilotState = {
  autopilotData: undefined,
  autopilotSelected: true,
  errorMessage: undefined,
}

export const applyBestLocationAsAutopilot = createAsyncThunk(
  'autopilot/applyBestLocationAsAutopilot',
  async (_, { getState, dispatch }) => {
    const bestLocationLoading = getState().bestLocation.loading
    if (bestLocationLoading === 'idle' || bestLocationLoading === 'rejected') {
      // We use alias here because we make request to back-end
      await dispatch({ type: `alias/${FETCH_BEST_LOCATION}` })
    }

    const { location_name: bestLocationName, dc_id: bestDataCenterId } = getState().bestLocation
    if (!bestLocationName || !bestDataCenterId)
      throw new AutopilotConnectionError('No best location candidates are available')

    const location = selectLocationByName(getState(), bestLocationName)
    if (!location)
      throw new AutopilotConnectionError(`No location with name ${bestLocationName} was found`)

    const dataCenter = findDataCenterById(location, bestDataCenterId)
    if (!dataCenter)
      throw new AutopilotConnectionError(`No data center with id ${bestDataCenterId} was found`)

    dispatch(setAutopilotData({ location, dataCenter }))
  },
)

export const CONNECT_TO_AUTOPILOT = 'autopilot/connectToAutopilot'

export const connectToAutopilot = createAsyncThunk(
  CONNECT_TO_AUTOPILOT,
  async (_, { getState, dispatch }) => {
    await dispatch(applyBestLocationAsAutopilot())

    const location = getState().autopilot.autopilotData?.location
    const dataCenter = getState().autopilot.autopilotData?.dataCenter
    if (!location || !dataCenter)
      throw new AutopilotConnectionError('No autopilot candidates are available')

    dispatch(setCurrentLocation(location))
    dispatch(setCurrentDataCenter(dataCenter))

    const hostname = getState().currentDataCenter?.hosts?.[0].hostname
    if (!hostname) throw new AutopilotConnectionError(`No data center is being used as current`)
    await dispatch(connectProxy(hostname))

    dispatch(setAutopilotSelected(true))
  },
)

export const autopilotSlice = createSlice({
  name: 'autopilot',
  initialState,
  reducers: {
    setAutopilotData(state, action: PayloadAction<Autopilot>) {
      state.autopilotData = action.payload
    },
    setAutopilotSelected(state, action: PayloadAction<boolean>) {
      state.autopilotSelected = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(applyBestLocationAsAutopilot.rejected, (state, action) => {
      state.errorMessage = `${action.error.name}. ${action.error.message}`
      // TODO push error Message to debugLog
    })
    builder.addCase(connectToAutopilot.rejected, (state, action) => {
      state.errorMessage = `${action.error.name}. ${action.error.message}`
      // TODO push error Message to debugLog
    })
  },
})

export const { setAutopilotData, setAutopilotSelected } = autopilotSlice.actions
export default autopilotSlice.reducer

class AutopilotConnectionError {
  message: string
  name: string

  constructor(message: string) {
    this.message = message
    this.name = 'Connection to autopilot error'
  }
}
