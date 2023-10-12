import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type IsRightAfterLoginState = boolean
const initialState: IsRightAfterLoginState = true

export const isRightAfterLoginSlice = createSlice({
  name: 'isRightAfterLogin',
  initialState,
  reducers: {
    setIsRightAfterLogin(state: IsRightAfterLoginState, action: PayloadAction<boolean>) {
      return action.payload
    },
  },
})

export const { setIsRightAfterLogin } = isRightAfterLoginSlice.actions
export default isRightAfterLoginSlice.reducer
