import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type UserStashesState = {
  [key: string]: object
}

const initialState: UserStashesState = {}

export const userStashesSlice = createSlice({
  name: 'userStashes',
  initialState,
  reducers: {
    setUserStashes(state, action: PayloadAction<{ [key: string]: object }>) {
      return { ...state, ...action.payload }
    },
  },
})

export const { setUserStashes } = userStashesSlice.actions
export default userStashesSlice.reducer
