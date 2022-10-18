import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

import { connect, disconnect } from 'utils/proxyConfig'
import { selectLocationByName, findDataCenterById } from '../selectors'
import { fetchBestLocation } from './bestLocation'
import { setCurrentLocation } from './currentLocation'
import { setCurrentDataCenter } from './currentDataCenter'

interface ProxyState {
  isConnected: boolean
  host: string | undefined
  errorMessage?: string
}

const initialState: ProxyState = {
  isConnected: false,
  host: undefined,
  errorMessage: undefined,
}

export const CONNECT_PROXY = 'proxy/connectProxy'
export const DISCONNECT_PROXY = 'proxy/disconnectProxy'

export const connectProxy = createAsyncThunk(CONNECT_PROXY, async (host: string, { dispatch }) => {
  await connect(host)
  dispatch(setProxy(host))
})

export const disconnectProxy = createAsyncThunk(DISCONNECT_PROXY, async (_, { dispatch }) => {
  await disconnect()
  dispatch(resetProxy())
})

export const CONNECT_TO_BEST_LOCATION = 'servers/connectToBestLocation'

export const connectToBestLocation = createAsyncThunk(
  CONNECT_TO_BEST_LOCATION,
  async (_, { getState, dispatch }) => {
    const bestLocationLoading = getState().bestLocation.loading
    if (bestLocationLoading === 'idle' || bestLocationLoading === 'rejected') {
      await dispatch(fetchBestLocation())
    }

    const { location_name: bestLocationName, dc_id: bestDataCenterId } = getState().bestLocation
    if (!bestLocationName || !bestDataCenterId)
      throw new ProxyConnectionError('No best location candidates is available')
    const location = selectLocationByName(getState(), bestLocationName)
    if (!location)
      throw new ProxyConnectionError(`No location with name ${bestLocationName} was found`)
    const dataCenter = findDataCenterById(location, bestDataCenterId)
    if (!dataCenter)
      throw new ProxyConnectionError(`No data center with id ${bestDataCenterId} was found`)

    dispatch(setCurrentLocation(location))
    dispatch(setCurrentDataCenter(dataCenter))
    const hostname = getState().currentDataCenter?.hosts?.[0].hostname
    if (!hostname) throw new ProxyConnectionError(`No data center is being used as current`)
    await dispatch(connectProxy(hostname))
  },
)

export const proxySlice = createSlice({
  name: 'proxy',
  initialState,
  reducers: {
    setProxy(state, action: PayloadAction<string>) {
      state.host = action.payload
    },
    resetProxy(state) {
      state.host = undefined
      state.isConnected = false
      state.errorMessage = undefined
    },
    setConnectionError(state, action: PayloadAction<string>) {
      state.errorMessage = `Proxy connection error. ${action.payload}`
    },
  },
  extraReducers: builder => {
    builder
      .addCase(connectProxy.pending, state => {
        state.isConnected = false
      })
      .addCase(connectProxy.fulfilled, state => {
        state.isConnected = true
      })
      .addCase(connectProxy.rejected, (state, action) => {
        state.isConnected = false
        if (action.error.message) {
          state.errorMessage = action.error.message
        }
      })
      .addCase(disconnectProxy.fulfilled, state => {
        state.isConnected = false
      })
      .addCase(connectToBestLocation.rejected, (state, action) => {
        state.errorMessage = `${action.error.name}. ${action.error.message}`
      })
  },
})

export const { setProxy, resetProxy, setConnectionError } = proxySlice.actions
export default proxySlice.reducer

class ProxyConnectionError {
  message: string
  name: string

  constructor(message: string) {
    this.message = message
    this.name = 'Proxy connection error'
  }
}
