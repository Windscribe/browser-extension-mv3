import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

import type { ServerList, ServerCredentials, ServerListParameters } from 'api/types'
import { type LoadingState } from 'utils/types'
import { getServerList, getServerCredentials } from 'api'
import applyWorkingApi from '../applyWorkingApi'

interface ServersState {
  serverCredentials?: ServerCredentials
  serverList?: ServerList
  loading: LoadingState
}

const initialState: ServersState = {
  serverCredentials: undefined,
  serverList: undefined,
  loading: 'idle',
}

// TODO Move serverCredentials to separate slice
export const FETCH_SERVER_CREDENTIALS = 'servers/fetchServerCredentials'

export const fetchServerCredentials = createAsyncThunk(
  FETCH_SERVER_CREDENTIALS,
  async (_, { getState, dispatch }) => {
    let response
    const store = getState()
    const workingApi = store.workingApi
    const sessionAuthHash = store.session.session_auth_hash

    if (sessionAuthHash) {
      response = await applyWorkingApi<ServerCredentials, string>(
        getServerCredentials,
        sessionAuthHash,
        workingApi,
        dispatch,
      )
    }
    // TODO Add Error handling
    return response?.data // what should I return if condition is false
  },
)

export const FETCH_SERVER_LIST = 'servers/fetchServerList'
export const fetchServerList = createAsyncThunk(
  FETCH_SERVER_LIST,
  async (_, { getState, dispatch }) => {
    let response
    const store = getState()
    const serversListLoading = store.servers.loading
    const serverList = store.servers.serverList
    const workingApi = store.workingApi
    const { loc_hash, is_premium } = store.session

    if (serversListLoading === 'fulfilled') return serverList

    if (loc_hash) {
      response = await applyWorkingApi<ServerList, ServerListParameters>(
        getServerList,
        { locHash: loc_hash, isPro: is_premium },
        workingApi,
        dispatch,
      )
    }
    // TODO Add Error handling
    return response?.data // what should I return if condition is false
  },
)

export const serversSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {
    setServerCredentials(state, action: PayloadAction<ServerCredentials>) {
      state.serverCredentials = action.payload
    },
    setServerList(state, action: PayloadAction<ServerList>) {
      state.serverList = action.payload
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
      .addCase(fetchServerCredentials.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.serverCredentials = action.payload
      })
  },
})

export const { setServerList, setServerCredentials } = serversSlice.actions

export default serversSlice.reducer
