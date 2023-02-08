import { createSlice, createAsyncThunk, type PayloadAction, type Dispatch } from '@reduxjs/toolkit'

import type { Host } from 'api/types'
import { connect, disconnect } from 'services/proxyConfig'
import { reduceWhitelist } from 'utils/reduceWhitelist'
import type { SyncThunkCreator } from 'utils/types'
import { pushToDebugLog } from './debugLog'
import { setReconnectionAttempts } from './connection'
import { checkIp } from 'services'

interface ProxyState {
  isConnected: boolean
  isPending: boolean
  hosts: Host[] | undefined
  errorMessage?: string
}

const initialState: ProxyState = {
  isConnected: false,
  isPending: false,
  hosts: undefined,
  errorMessage: undefined,
}

export const CONNECT_PROXY = 'proxy/connectProxy'
export const DISCONNECT_PROXY = 'proxy/disconnectProxy'

export const connectProxy = createAsyncThunk(
  CONNECT_PROXY,
  async (hosts: Host[], { dispatch, getState }) => {
    if (!hosts || hosts?.length === 0) {
      throw Error('Error while trying to connect to proxy. No hostname was provided.')
    }

    const whitelist = reduceWhitelist(getState())
    await connect(hosts, whitelist)
    dispatch(setProxy(hosts))
    const ip = await checkIp(getState().workingApi)
    if (ip === '---.---.---.---') {
      throw Error('Failed to connect to proxy')
    } else {
      dispatch(setReconnectionAttempts(0))
    }
  },
)

export const disconnectProxy = createAsyncThunk(DISCONNECT_PROXY, async (_, { dispatch }) => {
  await disconnect()
  dispatch(resetProxy())
})

export const handleConnectionError: SyncThunkCreator<string> = errorMessage => {
  const action = (dispatch: Dispatch) => {
    dispatch(pushToDebugLog({ message: errorMessage, level: 'ERROR' }))
    dispatch(setConnectionError(errorMessage))
  }
  // Add type manually to view this action in a debugLog
  action.type = 'proxy/handleConnectionError'
  return action
}

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
        state.isPending = true
      })
      .addCase(connectProxy.fulfilled, state => {
        state.isConnected = true
        state.isPending = false
      })
      .addCase(connectProxy.rejected, (state, action) => {
        state.isConnected = false
        state.isPending = false
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
