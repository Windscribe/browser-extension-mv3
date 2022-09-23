import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type ServerList, Location, DataCenter, Autopilot } from 'api/types'

interface ServersState {
  serverList?: ServerList
  currentLocation?: Location
  currentDataCenter?: DataCenter
  isConnected: boolean
  autopilot?: Autopilot
}

const initialState: ServersState = {
  serverList: undefined,
  currentLocation: undefined,
  currentDataCenter: undefined,
  isConnected: false,
  autopilot: undefined,
}

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
})

export const {
  setServerList,
  setCurrentLocation,
  setCurrentDataCenter,
  setIsConnected,
  setAutopilot,
} = serversSlice.actions
export default serversSlice.reducer
