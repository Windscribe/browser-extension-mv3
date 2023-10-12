import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

import type { Autopilot, CruiseControlItem } from 'api/types'
import { selectLocationByName, findDataCenterById } from './servers'
import { FETCH_BEST_LOCATION } from './bestLocation'
import { getCruiseControlDomains } from 'api/endpoints'
import createCruiseControlList from 'services/cruiseControl/createCruiseControlList'

interface AutopilotState {
  autopilotData?: Autopilot
  autopilotSelected: boolean
  cruiseControlList?: CruiseControlItem[]
  errorMessage?: string
}

const initialState: AutopilotState = {
  autopilotData: undefined,
  autopilotSelected: true,
  cruiseControlList: undefined,
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

    const session_auth_hash = getState().session.sessionData?.session_auth_hash
    const is_premium = getState().session.sessionData?.is_premium

    const serverList = getState().servers.serverList
    const cruiseControlDomainsResponse = await getCruiseControlDomains(dispatch, session_auth_hash)
    if (cruiseControlDomainsResponse.errorMessage)
      throw new Error('Failed to fetch cruise control domains found')
    if (!cruiseControlDomainsResponse.data || !cruiseControlDomainsResponse.data.domains)
      throw new Error('No cruise control domains found')

    const cruiseControlList = createCruiseControlList(
      serverList,
      is_premium,
      cruiseControlDomainsResponse.data.domains,
    )

    dispatch(setCruiseControlList(cruiseControlList))
  },
)

export const autopilotSlice = createSlice({
  name: 'autopilot',
  initialState,
  reducers: {
    setAutopilotData(state, action: PayloadAction<Autopilot>) {
      state.autopilotData = action.payload
      state.errorMessage = undefined
    },
    setAutopilotSelected(state, action: PayloadAction<boolean>) {
      state.autopilotSelected = action.payload
    },
    setCruiseControlList(state, action: PayloadAction<CruiseControlItem[]>) {
      state.cruiseControlList = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(applyBestLocationAsAutopilot.rejected, (state, action) => {
      state.errorMessage = `${action.error.name}. ${action.error.message}`
    })
  },
})

export const { setAutopilotData, setAutopilotSelected, setCruiseControlList } =
  autopilotSlice.actions
export default autopilotSlice.reducer

class AutopilotConnectionError {
  message: string
  name: string

  constructor(message: string) {
    this.message = message
    this.name = 'Connection to autopilot error'
  }
}
