import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { LoadingState, Either, ErrorState } from 'utils/types'
import { ACCOUNT_STATES, ACCOUNT_PLAN } from 'utils/constants'
import type { ApiErrorResponse, Credentials, SessionData } from 'api/types'
import { disconnectProxy } from './proxy'
import { checkUserStash, saveUserStash } from 'state/slices/userStashes'
import { resetNotificationBlocker } from './notificationBlockerEnabled'
import { login as loginRequest, logout as logoutRequest, getSessionStatus } from 'api/endpoints'
import { resetWebRtcBlocker } from './webRtcEnabled'
import { addOverlay } from 'state/slices/overlay'
import { setView } from 'state/slices/view'
import { checkIp } from 'services'
import { setCurrentIp } from 'state/slices/proxy'

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
export const CHECK_SESSION_STATUS = 'session/checkSessionStatus'

export const login = createAsyncThunk<Either<SessionData, ApiErrorResponse>, Credentials>(
  LOGIN,
  async ({ username, password, twoFa }, { dispatch }) => {
    const response = await loginRequest(dispatch, username, password, twoFa)

    if (response.errorMessage) return response
    if (response.data && response.data.username) {
      const ip = await checkIp()
      dispatch(setCurrentIp(ip))
      await dispatch(checkUserStash(response.data.username))
      dispatch(setView('Home'))

      return response.data
    }

    throw Error('Unknown response format while trying to login')
  },
)

export const logout = createAsyncThunk(LOGOUT, async (_, { getState, dispatch }) => {
  const sendLogoutRequest = async () => {
    const sessionAuthHash = getState().session.session_auth_hash
    sessionAuthHash && (await logoutRequest(dispatch, sessionAuthHash))
  }
  const resetState = async () => {
    await dispatch(saveUserStash())
    await dispatch({ type: 'global/resetStore' })
    await dispatch(disconnectProxy())
    await dispatch(resetNotificationBlocker())
    await dispatch(resetWebRtcBlocker())
  }

  await Promise.all([sendLogoutRequest(), resetState()])
})

export const checkSessionStatus = createAsyncThunk(
  CHECK_SESSION_STATUS,
  async (_, { getState, dispatch }) => {
    const { isConnected } = getState().proxy
    const currentSession = getState().session

    // poll only when connected and we have a session_auth_hash
    // TODO Consider to push user on Login page if we don't have session_auth_hash (pretty rare case tho, or even impossible)
    if (currentSession?.session_auth_hash) {
      const updatedSession = await getSessionStatus(dispatch, currentSession?.session_auth_hash)
      if (updatedSession.data) {
        if (
          isConnected &&
          !updatedSession.data.is_premium &&
          updatedSession.data.traffic_max !== ACCOUNT_PLAN.UNLIMITED &&
          updatedSession.data.traffic_max !== undefined &&
          updatedSession.data.traffic_used !== undefined &&
          updatedSession.data.traffic_max - updatedSession.data.traffic_used <= 0
        ) {
          dispatch(addOverlay('noData'))
          dispatch(disconnectProxy())
        }
        if (updatedSession.data.status === ACCOUNT_STATES.BANNED) {
          await dispatch(logout())
          dispatch(addOverlay('banned'))
        }

        if (
          currentSession.is_premium === ACCOUNT_PLAN.PREMIUM &&
          updatedSession.data.is_premium === ACCOUNT_PLAN.FREE
        ) {
          dispatch(addOverlay('proPlanExpired'))
        }
        dispatch(setSession(updatedSession.data))
      }
    }
  },
)

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<SessionData>) {
      return { ...state, loading: 'fulfilled', our_ip: 0, ...action.payload }
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
