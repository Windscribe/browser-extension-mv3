import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ENVS } from 'utils/constants'

type WorkingApiState = string | null
const initialState: WorkingApiState = ENVS.API_URL

export const workingApiSlice = createSlice({
  name: 'workingApi',
  initialState,
  reducers: {
    setWorkingApi(state: WorkingApiState, action: PayloadAction<string>) {
      return action.payload
    },
    resetWorkingApi(state: WorkingApiState) {
      state = null // TODO or ENVS.API_URL ?
    },
  },
})

export const { setWorkingApi, resetWorkingApi } = workingApiSlice.actions
export default workingApiSlice.reducer
