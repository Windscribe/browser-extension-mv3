import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { Host } from 'api/types'

import { connect, disconnect } from 'utils/proxyConfig'
import { createBypassList } from 'utils/createBypassList'

interface ProxyState {
  isConnected: boolean
  hosts: Host[] | undefined
  errorMessage?: string
}

const initialState: ProxyState = {
  isConnected: false,
  hosts: undefined,
  errorMessage: undefined,
}

export const CONNECT_PROXY = 'proxy/connectProxy'
export const DISCONNECT_PROXY = 'proxy/disconnectProxy'

export const connectProxy = createAsyncThunk(
  CONNECT_PROXY,
  async (hosts: Host[], { dispatch, getState }) => {
    if (hosts.length === 0) {
      throw Error('Error while trying to connect to proxy. No hostname was provided.')
    }

    const bypassList = createBypassList(getState())
    await connect(hosts, bypassList)
    dispatch(setProxy(hosts))
  },
)

export const disconnectProxy = createAsyncThunk(DISCONNECT_PROXY, async (_, { dispatch }) => {
  await disconnect()
  dispatch(resetProxy())
})

export const proxySlice = createSlice({
  name: 'proxy',
  initialState,
  reducers: {
    setProxy(state, action: PayloadAction<Host[]>) {
      state.hosts = action.payload
      state.errorMessage = undefined
    },
    resetProxy(state) {
      state.hosts = undefined
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
  },
})

export const { setProxy, resetProxy, setConnectionError } = proxySlice.actions
export default proxySlice.reducer
