import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { getNotifications } from 'api/endpoints'
import type { ApiErrorResponse, NotificationsData } from 'api/types'
import type { LoadingState, Either, ErrorState } from 'utils/types'

interface NewsfeedState {
  notifications: NotificationsData[]
  viewedNewsIds: number[]
  loading: LoadingState
  error?: ErrorState

  showNewsfeed: boolean
}

export const initialState: NewsfeedState = {
  notifications: [],
  viewedNewsIds: [],
  loading: 'idle',
  error: undefined,
  showNewsfeed: false,
}

export const FETCH_NOTIFICATIONS = 'newsfeed/fetchNotifications'

export const fetchNotifications = createAsyncThunk<
  Either<
    {
      notifications: NotificationsData[]
      showNewsfeed: boolean
    },
    ApiErrorResponse
  >
>(FETCH_NOTIFICATIONS, async (_, { getState, dispatch }) => {
  const sessionAuthHash = getState().session.sessionData?.session_auth_hash
  if (!sessionAuthHash) {
    throw Error('No session auth hash is available')
  }

  const response = await getNotifications(dispatch, sessionAuthHash)

  if (response.errorCode) return response

  if (response.data) {
    const firstInstallDate = getState().firstInstallDate
    // 5 minutes from install - relic from mv2 extension
    // and doing it the same way
    const cutoff = (Math.floor(Date.now() / 1000) - 300) * 1000

    const newsfeed = getState().newsfeed
    const notifications = response.data?.notifications ?? []
    const popUpItems = notifications.filter(
      item => item?.popup && !newsfeed.viewedNewsIds.includes(item.id),
    )

    const showNewsfeed = popUpItems.length > 0 && firstInstallDate < cutoff
    return { notifications, showNewsfeed }
  }

  throw Error('Unknown response format from GET Notifications')
})

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
    setShowNewsfeed(state, action: PayloadAction<boolean>) {
      state.showNewsfeed = action.payload
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

        return {
          ...state,
          error: undefined,
          loading: 'fulfilled',
          notifications: action.payload.notifications ?? [],
          showNewsfeed: action.payload.showNewsfeed ?? false,
        }
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = 'rejected'
        if (action.error.message) {
          state.error = { errorMessage: action.error.message }
        }
      })
  },
})

export const { resetNewsfeed, markNewsAsViewed, clearViewedNewsIds, setShowNewsfeed } =
  newsfeedSlice.actions
export default newsfeedSlice.reducer
