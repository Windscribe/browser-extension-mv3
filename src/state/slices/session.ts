import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { LoadingState, Either, ErrorState } from 'utils/types'
import { ACCOUNT_STATES, ACCOUNT_PLAN, SESSION_ERRORS } from 'utils/constants'
import type { ApiErrorResponse, Credentials, SessionData } from 'api/types'
import { checkUserStash, saveUserStash } from 'state/slices/userStashes'
import { resetNotificationBlocker } from './notificationBlockerEnabled'
import { login as loginRequest, logout as logoutRequest, getSessionStatus } from 'api/endpoints'
import { resetWebRtcBlocker } from './webRtcEnabled'
import { addOverlay } from 'state/slices/overlay'
import { setView } from 'state/slices/view'
import { checkIp } from 'services'
import { setCurrentIp } from 'state/slices/proxy'
import { connectToAutopilot, disconnect } from 'services/proxyConfig'
import { fetchServerList } from 'state/slices/servers'
import { fetchServerCredentials } from 'state/slices/serverCredentials'
import { applyBestLocationAsAutopilot, setAutopilotSelected } from './autopilot'
import { fetchBestLocation } from './bestLocation'
import { setCurrentLocation } from 'state/slices/currentLocation'
import { setCurrentDataCenter } from 'state/slices/currentDataCenter'
import { fetchNotifications } from 'state/slices/newsfeed'
import { refreshFavorites } from './favoriteLocations'

export interface SessionState {
  sessionData?: SessionData
  loading: LoadingState
  error?: ErrorState
}

const initialState: SessionState = {
  sessionData: undefined,
  error: undefined,
  loading: 'idle',
}

export const LOGIN = 'session/login'
export const LOGOUT = 'session/logout'
export const CHECK_SESSION_STATUS = 'session/checkSessionStatus'

export const login = createAsyncThunk<Either<SessionData, ApiErrorResponse>, Credentials>(
  LOGIN,
  async ({ username, password, twoFa }, { getState, dispatch }) => {
    const response = await loginRequest(dispatch, username, password, twoFa)

    if (response.errorMessage) return response
    if (response.data && response.data.username) {
      const ip = await checkIp(getState().workingApi)
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
    const sessionAuthHash = getState().session.sessionData?.session_auth_hash
    sessionAuthHash && (await logoutRequest(dispatch, sessionAuthHash))
  }
  const resetState = async () => {
    await dispatch(saveUserStash())
    await dispatch({ type: 'global/resetStore' })
    await disconnect(getState, dispatch)
    await dispatch(resetNotificationBlocker())
    await dispatch(resetWebRtcBlocker())
  }

  await Promise.all([sendLogoutRequest(), resetState()])
})

export const checkSessionStatus = createAsyncThunk(
  CHECK_SESSION_STATUS,
  async (_, { getState, dispatch }) => {
    const status = getState().proxy.status
    const currentSession = getState().session

    // poll only when connected and we have a session_auth_hash
    // TODO Consider to push user on Login page if we don't have session_auth_hash (pretty rare case tho, or even impossible)
    if (currentSession?.sessionData?.session_auth_hash) {
      const updatedSession = await getSessionStatus(
        dispatch,
        currentSession?.sessionData?.session_auth_hash,
      )

      if (updatedSession.data) {
        if (
          (status === 'on' &&
            !updatedSession.data.is_premium &&
            updatedSession.data.traffic_max !== ACCOUNT_PLAN.UNLIMITED &&
            updatedSession.data.traffic_max !== undefined &&
            updatedSession.data.traffic_used !== undefined &&
            updatedSession.data.traffic_max - updatedSession.data.traffic_used <= 0) ||
          updatedSession.data.status === ACCOUNT_STATES.EXPIRED
        ) {
          dispatch(addOverlay('noData'))
          await disconnect(getState, dispatch)
        }

        if (updatedSession.data.status === ACCOUNT_STATES.BANNED) {
          await dispatch(logout())
          dispatch(addOverlay('banned'))
        }

        if (
          currentSession.sessionData?.is_premium === ACCOUNT_PLAN.PREMIUM &&
          updatedSession.data.is_premium === ACCOUNT_PLAN.FREE
        ) {
          dispatch(addOverlay('proPlanExpired'))
        }

        dispatch(setSession(updatedSession.data))

        const sessionPropertiesToWatch: Array<keyof SessionData> = [
          'alc',
          'billing_plan_id',
          'is_premium',
          'last_reset',
          'loc_hash',
          'loc_rev',
          'status',
          'traffic_max',
        ]

        const isSessionChanges = sessionPropertiesToWatch.some(p => {
          if (!currentSession?.sessionData?.hasOwnProperty(p)) {
            return updatedSession.data.hasOwnProperty(p)
          } else {
            return currentSession?.sessionData[p]?.toString() !== updatedSession.data[p]?.toString()
          }
        })

        if (isSessionChanges) {
          await dispatch(fetchServerCredentials())
          await dispatch(fetchServerList())
          await dispatch(fetchNotifications())

          const currentLocation = getState().currentLocation
          const currentDataCenter = getState().currentDataCenter

          const serverList = getState().servers.serverList
          const isConnected = getState().proxy.status === 'on'
          const isPremium = getState().session.sessionData?.is_premium

          dispatch(refreshFavorites(serverList))

          const locationNewList = serverList.find(location => location.id === currentLocation.id)
          const dataCenterNewList = locationNewList?.groups.find(
            dataCenter => dataCenter.id === currentDataCenter.id,
          )

          const showPro = !isPremium && dataCenterNewList?.pro
          if (showPro) {
            await dispatch(fetchBestLocation())
            await dispatch(applyBestLocationAsAutopilot())

            if (isConnected) {
              await connectToAutopilot(getState, dispatch)
            } else {
              const location = getState().autopilot.autopilotData?.location
              const dataCenter = getState().autopilot.autopilotData?.dataCenter
              if (!location || !dataCenter) throw new Error('No autopilot candidates are available')
              dispatch(setAutopilotSelected(true))
              dispatch(setCurrentLocation(location))
              dispatch(setCurrentDataCenter(dataCenter))
            }
          }
        }
      } else if (updatedSession.errorCode === SESSION_ERRORS.SESSION_INVALID) {
        await dispatch(logout())
      }
    }
  },
)

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<SessionData>) {
      state.sessionData = {
        ...action.payload,
        session_auth_hash: state.sessionData?.session_auth_hash,
      }
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
          state.loading = 'idle'
          state.error = action.payload
        } else {
          state.sessionData = action.payload
          state.loading = 'fulfilled'
        }
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
