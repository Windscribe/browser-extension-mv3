import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

import { getBlocklists, getUserAgents } from 'api/endpoints'
import { platforms } from 'utils/constants'
import type { LoadingState, ErrorState } from 'utils/types'
import { pushToDebugLog } from 'services/debugLog'
import { getRandomIntInclusive } from 'utils/getRandomNumber'
import type { AppDispatch, GetState } from 'state'

type UserAgentState = {
  list: string[]
  original?: string
  spoofed: string
  loading: LoadingState
  error?: ErrorState
}

const initialState: UserAgentState = {
  list: [],
  original: undefined,
  spoofed: '',
  error: undefined,
  loading: 'idle',
}

export const FETCH_USER_AGENTS_LIST = 'userAgent/fetchUserAgentsList'
export const fetchUserAgentsList = createAsyncThunk(
  FETCH_USER_AGENTS_LIST,
  async (_, { getState, dispatch }) => {
    try {
      const sessionAuthHash = getState().session.sessionData?.session_auth_hash
      if (!sessionAuthHash) {
        throw Error('No session auth hash is available')
      }

      const blocklists = await getBlocklists(dispatch, sessionAuthHash)
      const userAgentsUrl = blocklists?.data?.useragents
      let userAgents = ''
      if (userAgentsUrl) {
        userAgents = await getUserAgents(userAgentsUrl)
      } else {
        throw Error('No userAgents url is available')
      }

      const originalUa = navigator.userAgent
      const currentPlatform = platforms.find(pl => originalUa.includes(pl))
      const uaList = userAgents
        .split(/\r?\n/)
        .filter(ua => ua !== originalUa)
        .reduce<string[]>((acc, ua) => {
          if (currentPlatform && ua.includes(currentPlatform)) {
            acc.push(ua)
          }
          return acc
        }, [])
      return uaList
    } catch (err) {
      const { cause, message } = err as Error
      pushToDebugLog({ level: 'ERROR', message: message, data: JSON.stringify(cause) })
      throw new Error(message)
    }
  },
)

export const setRandomSpoofedUserAgent = (dispatch: AppDispatch, getState: GetState): void => {
  const userAgentList = getState().userAgent.list
  const spoofedUserAgent = getState().userAgent.spoofed
  let randomizedUserAgent: string | null = null
  do {
    randomizedUserAgent = userAgentList[getRandomIntInclusive(0, userAgentList.length - 1)]
    //  if new random UA equals to the one currently spoofed than get a new random UA
  } while (randomizedUserAgent === spoofedUserAgent)
  dispatch(setSpoofedUserAgent(randomizedUserAgent))
}

export const userAgentSlice = createSlice({
  name: 'userAgent',
  initialState,
  reducers: {
    setOriginalUserAgent(state: UserAgentState, action: PayloadAction<string>) {
      state.original = action.payload
    },
    setSpoofedUserAgent(state: UserAgentState, action: PayloadAction<string>) {
      state.spoofed = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserAgentsList.pending, state => {
        state.error = undefined
        state.loading = 'pending'
      })
      .addCase(fetchUserAgentsList.fulfilled, (state, action) => {
        return { ...state, error: undefined, ...{ loading: 'fulfilled' }, list: action.payload }
      })
      .addCase(fetchUserAgentsList.rejected, (state, action) => {
        state.loading = 'rejected'
        if (action.error.message) {
          state.error = { errorMessage: action.error.message }
        }
      })
  },
})

export const { setOriginalUserAgent, setSpoofedUserAgent } = userAgentSlice.actions
export default userAgentSlice.reducer
