import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

import type { ServerList, ServerListParameters } from 'api/types'
import { type LoadingState } from 'utils/types'
import { getServerList } from 'api'
import applyWorkingApi from '../applyWorkingApi'

interface ServersState {
  serverList?: ServerList
  loading: LoadingState
}

const initialState: ServersState = {
  serverList: undefined,
  loading: 'idle',
}

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
  },
})

export const { setServerList } = serversSlice.actions

export default serversSlice.reducer
