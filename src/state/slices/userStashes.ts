import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type UserStashesState = {
  store: { [key: string]: object }
  username: string
}

const initialState: UserStashesState = {
  store: {},
  username: '',
}

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
