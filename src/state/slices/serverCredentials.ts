import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

import type { ServerCredentials, ApiErrorResponse } from 'api/types'
import type { LoadingState, ErrorState, Either } from 'utils/types'
import { getServerCredentials } from 'api/endpoints'

interface ServerCredentialsState {
  username?: string
  password?: string
  loading: LoadingState
  error?: ErrorState
}

const initialState: ServerCredentialsState = {
  username: undefined,
  password: undefined,
  error: undefined,
  loading: 'idle',
}

export const FETCH_SERVER_CREDENTIALS = 'servers/fetchServerCredentials'

export const fetchServerCredentials = createAsyncThunk<Either<ServerCredentials, ApiErrorResponse>>(
  FETCH_SERVER_CREDENTIALS,
  async (_, { getState, dispatch }) => {
    const store = getState()
    const sessionAuthHash = store.session.sessionData?.session_auth_hash

    if (!sessionAuthHash) {
      throw Error('No session auth hash is available')
    }

    const response = await getServerCredentials(dispatch, sessionAuthHash)

    // Back-end response with error object is treated as a valid response
    // and getServerCredentials() processed as successfully fulfilled.
    if (response?.errorMessage) return response
    if (response?.data) return response.data

    throw Error('Unknown response format from GET Server Credentials')
  },
)

export const serverCredentialsSlice = createSlice({
  name: 'serverCredentials',
  initialState,
  reducers: {
    setServerCredentials(state, action: PayloadAction<ServerCredentials>) {
      state.username = action.payload.username
      state.password = action.payload.password
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchServerCredentials.pending, state => {
        state.error = undefined
        state.loading = 'pending'
      })
      .addCase(fetchServerCredentials.fulfilled, (state, action) => {
        if (action.payload.errorMessage) {
          return { ...initialState, error: action.payload }
        }

        state.loading = 'fulfilled'
        state.error = undefined
        state.username = action.payload?.username
        state.password = action.payload?.password
      })
      .addCase(fetchServerCredentials.rejected, (state, action) => {
        state.loading = 'rejected'
        if (action.error.message) {
          state.error = { errorMessage: action.error.message }
        }
      })
  },
})

export const { setServerCredentials } = serverCredentialsSlice.actions
export default serverCredentialsSlice.reducer
