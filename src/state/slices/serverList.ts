import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Server } from 'api/types'

export type ServerListState = {
  [key: Server['id']]: Server
} // using server id as a key

const initialState: ServerListState = {}

export const serverListSlice = createSlice({
  name: 'serverList',
  initialState,
  reducers: {
    replace(_, action: PayloadAction<ServerListState>) {
      return action.payload
    },
    // TODO test this action
    updateById(state, action: PayloadAction<ServerListState>) {
      return { ...state, ...action.payload }
    },
  },
})

export const { replace, updateById } = serverListSlice.actions
export default serverListSlice.reducer
