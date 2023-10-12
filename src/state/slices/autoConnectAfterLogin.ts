import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type AutoConnectAfterLoginState = boolean
const initialState: AutoConnectAfterLoginState = true

export const autoConnectAfterLoginSlice = createSlice({
  name: 'autoConnectAfterLogin',
  initialState,
  reducers: {
    setAutoConnectAfterLogin(state: AutoConnectAfterLoginState, action: PayloadAction<boolean>) {
      return action.payload
    },
  },
})

export const { setAutoConnectAfterLogin } = autoConnectAfterLoginSlice.actions
export default autoConnectAfterLoginSlice.reducer
