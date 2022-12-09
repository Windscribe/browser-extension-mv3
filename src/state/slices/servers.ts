import { createSlice, createAsyncThunk, createSelector, type PayloadAction } from '@reduxjs/toolkit'

import type { ServerList, Location, ApiErrorResponse, DataCenter } from 'api/types'
import type { LoadingState, ErrorState, Either } from 'utils/types'
import applyWorkingApi from '../applyWorkingApi'
import { getServerList } from 'api/endpoints'
import type { RootState } from '../store'

interface ServersState {
  serverList: ServerList
  loading: LoadingState
  error?: ErrorState
}

const initialState: ServersState = {
  serverList: [],
  loading: 'idle',
  error: undefined,
}

export const FETCH_SERVER_LIST = 'servers/fetchServerList'
export const fetchServerList = createAsyncThunk<Either<ServerList, ApiErrorResponse>>(
  FETCH_SERVER_LIST,
  // Because serverList is an Array, we use rejectWithValue() fulfillWithValue() to avoid TS errors
  async (_, { getState, dispatch, rejectWithValue, fulfillWithValue }) => {
    const store = getState()
    const serversListLoading = store.servers.loading
    const serverList = store.servers.serverList
    const workingApi = store.workingApi
    const { loc_hash, is_premium } = store.session

    if (serversListLoading === 'fulfilled') {
      fulfillWithValue(serverList)
    }

    if (!loc_hash) {
      throw Error('No loc_hash is available. Try to sign in.')
    }

    const response = await getServerList(loc_hash, is_premium, workingApi)
    response.workingApi && applyWorkingApi(response.workingApi, workingApi, dispatch)

    if (response?.errorMessage) return rejectWithValue(response)
    if (response?.data) return response.data

    throw Error('Unknown response format from GET Servers List')
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
        if (action.payload.errorMessage) {
          return { ...initialState, error: action.payload }
        }

        state.error = undefined
        state.loading = 'fulfilled'
        state.serverList = action.payload as ServerList
      })
      .addCase(fetchServerList.rejected, (state, action) => {
        state.loading = 'rejected'
        if (action.error.message) {
          state.error = { errorMessage: action.error.message }
        }
      })
  },
})

export const selectLocationBySearchText = createSelector(
  (state: RootState) => state.servers.serverList,
  (_: RootState, searchText: string) => searchText,
  (serverList, searchText: string): ServerList => {
    const isFoundIn = (str: string) => str.toLowerCase().includes(searchText)

    const findDataCenters = (location: Location) =>
      location.groups.reduce<DataCenter[]>((accumulator, dataCenter) => {
        if (isFoundIn(dataCenter.city) || isFoundIn(dataCenter.nick)) accumulator.push(dataCenter)
        return accumulator
      }, [])

    return serverList.reduce<ServerList>((accumulator, location) => {
      const dataCentersThatMatch = findDataCenters(location)

      if (dataCentersThatMatch.length || isFoundIn(location.name)) {
        accumulator.push({ ...location, ...{ groups: dataCentersThatMatch } })
      }
      return accumulator
    }, [])
  },
)

export const selectSortedLocation = createSelector(
  (state: RootState) => state.servers.serverList,
  (state: RootState) => state.locationSorting,
  (serverList, locationSorting): ServerList => {
    if (locationSorting === 'alphabet') {
      return [...serverList].sort((first, second) => first.name.localeCompare(second.name))
    }
    return [...serverList]
  },
)

export const { setServerList } = serversSlice.actions

export default serversSlice.reducer
