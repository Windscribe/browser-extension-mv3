import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type Create } from './types'
import { SessionData } from 'api/types'

interface SessionState {
  data: SessionData | null
}

const defaultState: SessionState = {
  data: null,
}

export const create: Create<SessionState> = initialState =>
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
