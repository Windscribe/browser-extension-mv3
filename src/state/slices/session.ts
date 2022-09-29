import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type SessionData } from 'api/types'
import { login as loginRequest } from 'api'
import { type LoadingState } from 'utils/types'
export interface SessionState extends SessionData {
  errorCode?: number
  errorMessage?: string
  loading: LoadingState
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
  errorCode: undefined,
  errorMessage: undefined,
  loading: 'idle',
}

type Credentials = {
  username: string
  password: string
  twoFa?: string
}
export const login = createAsyncThunk('session/login', async (credentials: Credentials) => {
  const { username, password, twoFa } = credentials
  const response = await loginRequest(username, password, twoFa)

  return response.data
})

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<SessionState>) {
      return { ...state, ...action.payload }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, state => {
        state.loading = 'pending'
      })
      .addCase(login.fulfilled, (_, action) => {
        return { loading: 'fulfilled', ...action.payload }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'rejected'
        state.errorMessage = action.error.message
      })
  },
})

export const { setSession } = sessionSlice.actions
export default sessionSlice.reducer
