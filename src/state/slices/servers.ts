import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import type { ServerList, Location, DataCenter, Autopilot } from 'api/types'
import { type LoadingState } from 'utils/types'
import { getServerList } from 'api'
import type { AppDispatch, RootState } from '../store'
import { connectProxy } from './proxy'
import { fetchBestLocation } from './bestLocation'

interface ServersState {
  serverList?: ServerList
  loading: LoadingState
  currentLocation?: Location
  currentDataCenter?: DataCenter
  autopilot?: Autopilot
}

const initialState: ServersState = {
  serverList: undefined,
  loading: 'idle',
  currentLocation: undefined,
  currentDataCenter: undefined,
  autopilot: undefined,
}

export const FETCH_SERVER_LIST = 'servers/fetchServerList'

export const fetchServerList = createAsyncThunk<
  ServerList | undefined, // Return type of the payload creator
  undefined, // argument to the payload creator
  { dispatch: AppDispatch; state: RootState }
>(FETCH_SERVER_LIST, async (_, { getState }) => {
  let response
  const store = getState()
  const serversListLoading = store.servers.loading
  const serverList = store.servers.serverList
  const { loc_hash, is_premium } = store.session

  if (serversListLoading === 'fulfilled') return serverList

  if (loc_hash) {
    response = await getServerList(loc_hash, is_premium)
  }
  return response?.data // what should I return if condition is false
})

export const SET_AUTOPILOT_AS_CURRENT = 'servers/setAutopilotAsCurrent'

export const setAutopilotAsCurrent = createAsyncThunk<
  void, // Return type of the payload creator
  undefined, // argument to the payload creator
  { dispatch: AppDispatch; state: RootState }
>(SET_AUTOPILOT_AS_CURRENT, async (_, { getState, dispatch }) => {
  const bestLocationLoading = getState().bestLocation.loading
  if (bestLocationLoading === 'idle') {
    await dispatch(fetchBestLocation())
  }

  const { location_name: bestLocationName, dc_id: bestDataCenterId } = getState().bestLocation
  if (!bestLocationName || !bestDataCenterId) return
  const location = selectLocationByName(getState(), bestLocationName)
  if (!location) return
  const dataCenter = selectDataCenterById(location, bestDataCenterId)
  if (!dataCenter) return

  dispatch(setAutopilot({ location, dataCenter }))
  dispatch(setCurrentLocation(location))
  dispatch(setCurrentDataCenter(dataCenter))
  const hostname = getState().servers.currentDataCenter?.hosts[0].hostname
  if (!hostname) return
  await dispatch(connectProxy(hostname))
})

const selectLocationByName = (state: RootState, locationName: string): Location | undefined =>
  state.servers.serverList?.find(server => server.name === locationName)
const selectDataCenterById = (location: Location, dataCenterId: number): DataCenter | undefined =>
  location?.groups?.find(dataCenter => dataCenter.id === dataCenterId)

export const serversSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {
    setServerList(state, action: PayloadAction<ServerList>) {
      state.serverList = action.payload
    },
    setCurrentLocation(state, action: PayloadAction<Location>) {
      state.currentLocation = action.payload
    },
    setCurrentDataCenter(state, action: PayloadAction<DataCenter>) {
      state.currentDataCenter = action.payload
    },
    setAutopilot(state, action: PayloadAction<Autopilot>) {
      state.autopilot = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchServerList.pending, state => {
        state.loading = 'pending'
      })
      .addCase(fetchServerList.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.serverList = action.payload
      })
      .addCase(fetchServerList.rejected, state => {
        state.loading = 'rejected'
        //state.error = action.error.message
      })
  },
})

export const { setServerList, setCurrentLocation, setCurrentDataCenter, setAutopilot } =
  serversSlice.actions

export default serversSlice.reducer
