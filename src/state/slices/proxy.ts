import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

import { connect, disconnect } from 'utils/proxyConfig'
import type { AppDispatch, RootState } from '../store'

interface ProxyState {
  isConnected: boolean
  host: string | undefined
}

const initialState: ProxyState = {
  isConnected: false,
  host: undefined,
}

export const CONNECT_PROXY = 'proxy/connectProxy'
export const DISCONNECT_PROXY = 'proxy/disconnectProxy'

export const connectProxy = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: RootState }
>(CONNECT_PROXY, async (host, { dispatch }) => {
  await connect(host)
  dispatch(setProxy(host))
})

export const disconnectProxy = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: RootState }
>(DISCONNECT_PROXY, async (_, { dispatch }) => {
  await disconnect()
  dispatch(resetProxy())
})

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
      .addCase(connectProxy.rejected, state => {
        state.isConnected = false
      })
  },
})

export const { setProxy, resetProxy } = proxySlice.actions
export default proxySlice.reducer
