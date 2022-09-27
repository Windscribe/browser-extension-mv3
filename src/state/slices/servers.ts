import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import type { ServerList, Location, DataCenter, Autopilot } from 'api/types'
import { type LoadingState } from 'utils/types'
import { getServerList } from 'api'

interface ServersState {
  serverList?: ServerList
  loading: LoadingState
  currentLocation?: Location
  currentDataCenter?: DataCenter
  isConnected: boolean
  autopilot?: Autopilot
}

const initialState: ServersState = {
  serverList: undefined,
  loading: 'idle',
  currentLocation: undefined,
  currentDataCenter: undefined,
  isConnected: false,
  autopilot: undefined,
}

type SessionDetails = { locHash: string; isPro?: 0 | 1 }

export const fetchServerList = createAsyncThunk(
  'servers/fetchServerList',
  async (sessionDetails: SessionDetails) => {
    const { locHash, isPro } = sessionDetails
    const response = await getServerList(locHash, isPro)
    return response.data
  },
)

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
    setIsConnected(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload
    },
    setAutopilot(state, action: PayloadAction<Autopilot>) {
      state.autopilot = action.payload
    },
  },
  extraReducers(builder) {
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

export const {
  setServerList,
  setCurrentLocation,
  setCurrentDataCenter,
  setIsConnected,
  setAutopilot,
} = serversSlice.actions

export default serversSlice.reducer
