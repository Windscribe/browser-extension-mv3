import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type ServerListenerRunState = boolean
const initialState: ServerListenerRunState = false

export const serverListenerRunSlice = createSlice({
  name: 'serverListenerRun',
  initialState,
  reducers: {
    setServerListenerRun(state: ServerListenerRunState, action: PayloadAction<boolean>) {
      return action.payload
    },
  },
})

export const { setServerListenerRun } = serverListenerRunSlice.actions
export default serverListenerRunSlice.reducer
