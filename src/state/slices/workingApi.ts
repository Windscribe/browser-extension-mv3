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
  },
})

export const { setWorkingApi } = workingApiSlice.actions
export default workingApiSlice.reducer
