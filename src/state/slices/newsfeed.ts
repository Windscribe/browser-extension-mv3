import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { getNotifications } from 'api/endpoints'
import type { ApiErrorResponse, NotificationsData, Notifications } from 'api/types'
import type { LoadingState, Either, ErrorState } from 'utils/types'

interface NewsfeedState {
  notifications: NotificationsData[]
  viewedNewsIds: number[]
  loading: LoadingState
  error?: ErrorState
}

const initialState: NewsfeedState = {
  notifications: [],
  viewedNewsIds: [],
  loading: 'idle',
  error: undefined,
}

export const FETCH_NOTIFICATIONS = 'newsfeed/fetchNotifications'

export const fetchNotifications = createAsyncThunk<Either<Notifications, ApiErrorResponse>>(
  FETCH_NOTIFICATIONS,
  async (_, { getState, dispatch }) => {
    const sessionAuthHash = getState().session.sessionData?.session_auth_hash
    if (!sessionAuthHash) {
      throw Error('No session auth hash is available')
    }

    const response = await getNotifications(dispatch, sessionAuthHash)

    if (response.errorCode) return response
    if (response.data) return response?.data

    throw Error('Unknown response format from GET Notifications')
  },
)

export const newsfeedSlice = createSlice({
  name: 'newsfeed',
  initialState,
  reducers: {
    resetNewsfeed() {
      return initialState
    },
    clearViewedNewsIds(state) {
      state.viewedNewsIds = []
    },
    markNewsAsViewed(state, action: PayloadAction<number>) {
      const id = action.payload
      if (!state.viewedNewsIds.includes(id)) {
        state.viewedNewsIds.push(action.payload)
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNotifications.pending, state => {
        state.error = undefined
        state.loading = 'pending'
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        if (action.payload.errorCode) {
          return { ...state, notifications: [], loading: 'rejected', error: action.payload }
        }
        return { ...state, error: undefined, ...{ loading: 'fulfilled' }, ...action.payload }
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = 'rejected'
        if (action.error.message) {
          state.error = { errorMessage: action.error.message }
        }
      })
  },
})

export const { resetNewsfeed, markNewsAsViewed, clearViewedNewsIds } = newsfeedSlice.actions
export default newsfeedSlice.reducer
