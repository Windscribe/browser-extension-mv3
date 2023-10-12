import { createSlice, createAsyncThunk, createSelector, type PayloadAction } from '@reduxjs/toolkit'

import type { ServerList, Location, ApiErrorResponse, DataCenter } from 'api/types'
import type { LoadingState, ErrorState, Either } from 'utils/types'
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

    const loc_hash = store.session.sessionData?.loc_hash
    const is_premium = store.session.sessionData?.is_premium
    const alc = store.session.sessionData?.alc

    // TODO Consider of removing this condition. Lets discuss
    // Currently we do NOT fetch new list of servers if we've fetched it once.
    if (serversListLoading === 'fulfilled') {
      fulfillWithValue(serverList)
    }

    if (!loc_hash) {
      throw Error('No loc_hash is available. Try to sign in.')
    }

    const response = await getServerList(dispatch, loc_hash, is_premium, alc)

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

export const selectLocationByDataCenterId = createSelector(
  (state: RootState) => state.servers.serverList,
  (_: RootState, dataCenterId: number) => dataCenterId,
  (serverList, dataCenterId): Location | undefined => {
    return serverList.find(location =>
      location.groups.some(dataCenter => dataCenter.id === dataCenterId),
    )
  },
)

export const selectLocationByName = (
  state: RootState,
  locationName: string,
): Location | undefined => state.servers.serverList?.find(server => server.name === locationName)

export const findDataCenterById = (
  location: Location,
  dataCenterId: number,
): DataCenter | undefined => location?.groups?.find(dataCenter => dataCenter.id === dataCenterId)

export const { setServerList } = serversSlice.actions

export default serversSlice.reducer
