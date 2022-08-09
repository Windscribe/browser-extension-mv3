import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SessionData } from 'api/types'

interface SessionState {
  data: SessionData
}

const defaultState: SessionState = {
  data: {},
}

export const create = (initialState?: SessionState) =>
  createSlice({
    name: 'session',
    initialState: initialState || defaultState,
    reducers: {
      setSession(state, action: PayloadAction<SessionData>) {
        state.data = action.payload
      },
    },
  })

const sessionSlice = create()
export const { setSession } = sessionSlice.actions
export default sessionSlice.reducer
