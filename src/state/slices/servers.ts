import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type ServerCredentials, ServerList, Location, DataCenter, Autopilot } from 'api/types'

interface ServersState {
  serverCredentials?: ServerCredentials
  serverList?: ServerList
  currentLocation?: Location
  currentDataCenter?: DataCenter
  isConnected: boolean
  autopilot?: Autopilot
  autopilotSelected: boolean
}

const initialState: ServersState = {
  serverCredentials: undefined,
  serverList: undefined,
  currentLocation: undefined,
  currentDataCenter: undefined,
  isConnected: false,
  autopilot: undefined,
  autopilotSelected: false,
}

export const serversSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {
    setServerCredetials(state, action: PayloadAction<ServerCredentials>) {
      state.serverCredentials = action.payload
    },
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
    setAutopilotSelected(state, action: PayloadAction<boolean>) {
      state.autopilotSelected = action.payload
    },
  },
})

export const {
  setServerCredetials,
  setServerList,
  setCurrentLocation,
  setCurrentDataCenter,
  setIsConnected,
  setAutopilot,
  setAutopilotSelected,
} = serversSlice.actions
export default serversSlice.reducer
