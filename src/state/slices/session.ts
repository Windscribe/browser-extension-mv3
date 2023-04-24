import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { LoadingState, Either, ErrorState } from 'utils/types'
import type { ApiErrorResponse, Credentials, SessionData } from 'api/types'
import { disconnectProxy } from './proxy'
import { checkUserStash, saveUserStash } from 'state/slices/userStashes'
import { resetNotificationBlocker } from './notificationBlockerEnabled'
import { login as loginRequest, logout as logoutRequest } from 'api/endpoints'
import { resetWebRtcBlocker } from './webRtcEnabled'
import { setOverlay } from 'state/slices/overlay'
import { setView } from 'state/slices/view'
import detectUblock from 'services/detectUblock'

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
  our_addr: undefined,
  our_dc: undefined,
  our_ip: 0,
  our_location: undefined,
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

export const login = createAsyncThunk<Either<SessionData, ApiErrorResponse>, Credentials>(
  LOGIN,
  async ({ username, password, twoFa }, { dispatch }) => {
    const response = await loginRequest(dispatch, username, password, twoFa)

    if (response.errorMessage) return response
    if (response.data && response.data.username) {
      await dispatch(checkUserStash(response.data.username))
      dispatch(setView('Home'))
      const isUblockInstalled = await detectUblock()
      isUblockInstalled && dispatch(setOverlay({ isOpen: true, template: 'ublockDetected' }))
      return response.data
    }

    throw Error('Unknown response format while trying to login')
  },
)

export const logout = createAsyncThunk(LOGOUT, async (_, { getState, dispatch }) => {
  const sessionAuthHash = getState().session.session_auth_hash

  await dispatch(disconnectProxy())
  await dispatch(resetNotificationBlocker())
  await dispatch(resetWebRtcBlocker())
  await dispatch(disconnectProxy())
  sessionAuthHash && (await logoutRequest(dispatch, sessionAuthHash))

  await dispatch(saveUserStash())

  await dispatch({ type: 'global/resetStore' })
  //TODO Implement userStashes to store user's settings preferences between sessions
})

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<SessionData>) {
      return { ...state, our_ip: 0, ...action.payload }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.error = undefined
        state.loading = 'pending'
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.errorMessage) {
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
