import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getBestLocation } from 'api'
import type { BestLocation } from 'api/types'
import { type LoadingState } from 'utils/types'
import { selectLocationByName, findDataCenterById } from '../selectors'
import { connectProxy } from './proxy'
import { setCurrentLocation } from './currentLocation'
import { setCurrentDataCenter } from './currentDataCenter'

interface BestLocationState extends Partial<BestLocation> {
  loading: LoadingState
}

const initialState: BestLocationState = {
  loading: 'idle',
  city_name: undefined,
  country_code: undefined,
  dc_id: undefined,
  hostname: undefined,
  ip: undefined,
  ip2: undefined,
  ip3: undefined,
  location_name: undefined,
  server_id: undefined,
  short_name: undefined,
}

export const fetchBestLocation = createAsyncThunk<
  BestLocation | undefined, // Return type of the payload creator
  undefined, // argument to the payload creator
  {
    dispatch: AppDispatch
    state: RootState
  }
>('bestLocation/fetchBestLocation', async (_, { getState }) => {
  const sessionAuthHash = getState().session.session_auth_hash
  if (!sessionAuthHash) return // TODO Decide how handle this
  const bestLocation = await getBestLocation(sessionAuthHash)
  return bestLocation.data
  },
)

export const CONNECT_TO_BEST_LOCATION = 'servers/connectToBestLocation'

export const connectToBestLocation = createAsyncThunk(
  CONNECT_TO_BEST_LOCATION,
  async (_, { getState, dispatch }) => {
    const bestLocationLoading = getState().bestLocation.loading
    if (bestLocationLoading === 'idle') {
      await dispatch(fetchBestLocation())
    }

    const { location_name: bestLocationName, dc_id: bestDataCenterId } = getState().bestLocation
    if (!bestLocationName || !bestDataCenterId) return
    const location = selectLocationByName(getState(), bestLocationName)
    if (!location) return
    const dataCenter = findDataCenterById(location, bestDataCenterId)
    if (!dataCenter) return

    dispatch(setCurrentLocation(location))
    dispatch(setCurrentDataCenter(dataCenter))
    const hostname = getState().currentDataCenter?.hosts?.[0].hostname
    if (!hostname) return
    await dispatch(connectProxy(hostname))
  },
)

export const bestLocationSlice = createSlice({
  name: 'bestLocation',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBestLocation.pending, state => {
        state.loading = 'pending'
      })
      .addCase(fetchBestLocation.fulfilled, (state, action) => {
        return { ...state, ...{ loading: 'fulfilled' }, ...action.payload }
      })
      .addCase(fetchBestLocation.rejected, (state, action) => {
        state.loading = 'rejected'
        // state.errorMessage = action.error.message
      })
  },
})

export default bestLocationSlice.reducer
