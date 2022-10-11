import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getBestLocation } from 'api'
import { type BestLocation } from 'api/types'
import { type LoadingState } from 'utils/types'
import type { AppDispatch, RootState } from '../store'

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
})

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
