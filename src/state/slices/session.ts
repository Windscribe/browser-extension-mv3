import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type Create } from './types'
import { SessionData } from 'api/types'

export interface SessionState extends SessionData {
  error?: number
}

const defaultState: SessionState = {
  billing_plan_id: undefined,
  email: '',
  email_status: undefined,
  is_premium: 0,
  last_reset: undefined,
  loc_hash: undefined,
  loc_rev: undefined,
  reg_date: undefined,
  session_auth_hash: '',
  status: undefined,
  traffic_max: undefined,
  traffic_used: undefined,
  user_id: undefined,
  username: undefined,
  error: undefined,
}

export const create: Create<SessionState> = initialState =>
  createSlice({
    name: 'session',
    initialState: initialState || defaultState,
    reducers: {
      setSession(state, action: PayloadAction<SessionState>) {
        return { ...state, ...action.payload }
      },
    },
  })

const sessionSlice = create()
export const { setSession } = sessionSlice.actions
export default sessionSlice.reducer
