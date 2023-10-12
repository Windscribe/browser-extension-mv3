import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type WorkerBlockState = boolean
const initialState: WorkerBlockState = false

export const workerBlockSlice = createSlice({
  name: 'workerBlock',
  initialState,
  reducers: {
    setWorkerBlock(state: WorkerBlockState, action: PayloadAction<boolean>) {
      return action.payload
    },
  },
})

export const { setWorkerBlock } = workerBlockSlice.actions
export default workerBlockSlice.reducer
