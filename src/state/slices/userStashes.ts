import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import md5 from 'crypto-js/md5'

type UserStashesState = {
  store: { [key: string]: object }
  username: string
}

const initialState: UserStashesState = {
  store: {},
  username: '',
}

export const CHECK_USER_STASH = 'userStashes/checkUserStash'
export const SAVE_USER_STASH = 'userStashes/saveUserStash'

export const checkUserStash = createAsyncThunk(
  CHECK_USER_STASH,
  async (username: string, { getState, dispatch }) => {
    const userNameHash = md5(username || '').toString()
    const userStash = getState().userStashes.store[userNameHash]
    userStash && dispatch({ type: 'global/applyUserStash', payload: userStash })
  },
)

export const saveUserStash = createAsyncThunk(
  SAVE_USER_STASH,
  async (_, { getState, dispatch }) => {
    const state = getState()

    const userNameHash = md5(state.session.sessionData?.username || '').toString()

    const doNotStash = [
      'autoConnectAfterLogin',
      'currentDataCenter',
      'currentLocation',
      'workingApi',
      'proxy',
      'debugLog',
      'session',
      'servers',
      'serverCredentials',
      'view',
      'userStashes',
    ] as Array<keyof typeof state>

    const toStash = Object.assign({}, state)
    for (const slice of doNotStash) delete toStash[slice]

    dispatch(setUserStashes({ [userNameHash]: { toStash } }))
  },
)

export const userStashesSlice = createSlice({
  name: 'userStashes',
  initialState,
  reducers: {
    setUserStashes(state, action: PayloadAction<{ [key: string]: object }>) {
      state.store = { ...state.store, ...action.payload }
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload
    },
  },
})

export const { setUserStashes, setUsername } = userStashesSlice.actions
export default userStashesSlice.reducer
