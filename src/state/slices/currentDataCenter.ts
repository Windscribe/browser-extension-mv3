import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { DataCenter } from 'api/types'

const initialState: Partial<DataCenter> = {}

export const currentDataCenterSlice = createSlice({
  name: 'currentDataCenter',
  initialState,
  reducers: {
    setCurrentDataCenter(state, action: PayloadAction<DataCenter>) {
      return { ...state, ...action.payload }
    },
  },
})

export const { setCurrentDataCenter } = currentDataCenterSlice.actions
export default currentDataCenterSlice.reducer
