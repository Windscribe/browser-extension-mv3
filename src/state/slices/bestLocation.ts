import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

import { getBestLocation } from 'api'
import type { BestLocation, ApiErrorResponse } from 'api/types'
import type { LoadingState, Either, ErrorState } from 'utils/types'

interface BestLocationState extends Partial<BestLocation> {
  loading: LoadingState
  error?: ErrorState
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
  error: undefined,
}

export const FETCH_BEST_LOCATION = 'bestLocation/fetchBestLocation'

export const fetchBestLocation = createAsyncThunk<Either<BestLocation, ApiErrorResponse>>(
  FETCH_BEST_LOCATION,
  async (_, { getState }) => {
    const sessionAuthHash = getState().session.session_auth_hash
    if (!sessionAuthHash) {
      throw Error('No session auth hash is available')
    }

    const response = await getBestLocation(sessionAuthHash)

    // Back-end response with error object is treated as a valid response
    // and fetchBestLocation() processed as successfully fulfilled.
    if (response.errorCode) return response
    if (response.data) return response?.data

    throw Error('Unknown response format from GET Best Location')
  },
)

export const bestLocationSlice = createSlice({
  name: 'bestLocation',
  initialState,
  reducers: {
    resetBestLocation() {
      return initialState
    },
    setBestLocationError(state, action: PayloadAction<string>) {
      state.error = { errorMessage: action.payload }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBestLocation.pending, state => {
        state.error = undefined
        state.loading = 'pending'
      })
      .addCase(fetchBestLocation.fulfilled, (state, action) => {
        if (action.payload.errorCode) {
          return { ...initialState, ...{ loading: 'idle' }, error: action.payload }
        }
        return { ...state, ...{ loading: 'fulfilled' }, ...action.payload }
      })
      .addCase(fetchBestLocation.rejected, (state, action) => {
        state.loading = 'rejected'
        if (action.error.message) {
          state.error = { errorMessage: action.error.message }
        }
      })
  },
})

export const { resetBestLocation } = bestLocationSlice.actions
export default bestLocationSlice.reducer
