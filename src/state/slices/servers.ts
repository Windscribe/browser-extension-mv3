import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { County, DataCenter } from 'api/types'

export type ServersState = {
  countries: { [key in County['id']]: County }
  dataCenters: { [key in DataCenter['id']]: DataCenter }
  currentDataCenter: DataCenter | null
}

const initialState: ServersState = {
  countries: {},
  dataCenters: {},
  currentDataCenter: null,
}

export const serversSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {
    // TODO test this action
    setServers(state, action: PayloadAction<Omit<ServersState, 'currentDataCenter'>>) {
      return { ...state, ...action.payload }
    },
    setCurrentDataCenterById(state, action: PayloadAction<number>) {
      state.currentDataCenter = state.dataCenters[action.payload]
    },
  },
})

export const { setServers, setCurrentDataCenterById } = serversSlice.actions
export default serversSlice.reducer
