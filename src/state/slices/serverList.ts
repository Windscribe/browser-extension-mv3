import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Create } from './types'
import { type Server } from 'api/types'

export type ServerListState = {
  [key: Server['id']]: Server
} // using server id as a key

const defaultState: ServerListState = {}

export const create: Create<ServerListState> = initialState =>
  createSlice({
    name: 'serverList',
    initialState: initialState || defaultState,
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

const serverListSlice = create()
export const { replace, updateById } = serverListSlice.actions
export default serverListSlice.reducer
