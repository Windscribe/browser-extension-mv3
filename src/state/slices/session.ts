import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { login as loginRequest } from 'api'
import type { LoadingState, Either, ErrorState } from 'utils/types'
import type { ApiErrorResponse, SessionData } from 'api/types'
import { disconnectProxy } from './proxy'

export interface SessionState extends SessionData {
  loading: LoadingState
  error?: ErrorState
}

const initialState: SessionState = {
  billing_plan_id: undefined,
  email: '',
  email_status: undefined,
  is_premium: 0,
  last_reset: undefined,
  loc_hash: undefined,
  loc_rev: undefined,
  reg_date: undefined,
  session_auth_hash: '',
  status: undefined,
  traffic_max: undefined,
  traffic_used: undefined,
  user_id: undefined,
  username: undefined,
  error: undefined,
  loading: 'idle',
}

export const LOGIN = 'session/login'
export const LOGOUT = 'session/logout'
export type Credentials = {
  username: string
  password: string
  twoFa?: string
}

export const login = createAsyncThunk<Either<SessionData, ApiErrorResponse>, Credentials>(
  LOGIN,
  async credentials => {
    const { username, password, twoFa } = credentials
    const response = await loginRequest(username, password, twoFa)

    if (response.errorCode) return response
    if (response.data) return response.data

    throw Error('Unknown response format while trying to login')
  },
)

export const logout = createAsyncThunk(LOGOUT, async (_, { dispatch }) => {
  await dispatch(disconnectProxy())
  await dispatch({ type: 'global/resetStore' })
  //TODO Implement userStashes to store user's settings preferences between sessions
})

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<SessionState>) {
      return { ...state, ...action.payload }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.error = undefined
        state.loading = 'pending'
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.errorCode) {
          return { ...initialState, ...{ loading: 'idle' }, error: action.payload }
        }
        return { ...state, ...{ loading: 'fulfilled' }, ...action.payload }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'rejected'
        if (action.error.message) {
          state.error = { errorMessage: action.error.message }
        }
      })
  },
})

export const { setSession } = sessionSlice.actions
export default sessionSlice.reducer
