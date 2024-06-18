function userAgentSliceTemplate(userAgentList) {
  return `import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { platforms } from 'utils/constants'
import { getRandomIntInclusive } from 'utils/getRandomNumber'
import type { AppDispatch, GetState } from 'state'

type UserAgentState = {
  list: string[]
  original?: string
  spoofed: string
}

const initialState: UserAgentState = {
  list: [\n    ${userAgentList.join(',\n    ')},\n  ],
  original: undefined,
  spoofed: '',
  // error: undefined,
  // loading: 'idle',
}

// export const FETCH_USER_AGENTS_LIST = 'userAgent/fetchUserAgentsList'
// export const SETUP_USER_AGENTS_LIST = 'userAgent/setupUserAgentsList'
// export const fetchUserAgentsList = createAsyncThunk(
//   FETCH_USER_AGENTS_LIST,
//   async (_, { getState }) => {
//     try {
//       const originalUa = navigator.userAgent
//       const currentPlatform = platforms.find(pl => originalUa.includes(pl))
//       const uaList = getState()
//         .userAgent.list.filter(ua => ua !== originalUa)
//         .reduce<string[]>((acc, ua) => {
//           if (currentPlatform && ua.includes(currentPlatform)) {
//             acc.push(ua)
//           }
//           return acc
//         }, [])
//       return uaList
//     } catch (err) {
//       const { cause, message } = err as Error
//       pushToDebugLog({ level: 'ERROR', message: message, data: JSON.stringify(cause) })
//       throw new Error(message)
//     }
//   },
// )

export const setRandomSpoofedUserAgent = (dispatch: AppDispatch, getState: GetState): void => {
  const userAgentList = getState().userAgent.list
  const spoofedUserAgent = getState().userAgent.spoofed
  let randomizedUserAgent: string | null = null
  do {
    randomizedUserAgent = userAgentList[getRandomIntInclusive(0, userAgentList.length - 1)]
    //  if new random UA equals to the one currently spoofed than get a new random UA
  } while (randomizedUserAgent === spoofedUserAgent)
  dispatch(setSpoofedUserAgent(randomizedUserAgent))
  console.log(randomizedUserAgent)
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
    initializeUserAgentsList(state: UserAgentState) {
      const originalUa = navigator.userAgent
      const currentPlatform = platforms.find(pl => originalUa.includes(pl))
      const uaList = state.list
        .filter(ua => ua !== originalUa)
        .reduce<string[]>((acc, ua) => {
          if (currentPlatform && ua.includes(currentPlatform)) {
            acc.push(ua)
          }
          return acc
        }, [])
      state.list = uaList
    },
  },
})

export const { setOriginalUserAgent, setSpoofedUserAgent, initializeUserAgentsList } =
  userAgentSlice.actions
export default userAgentSlice.reducer

`
}

module.exports = userAgentSliceTemplate
