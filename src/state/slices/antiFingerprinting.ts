import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type AntiFingerprintingState = boolean
const initialState: AntiFingerprintingState = false

export const antiFingerprintingSlice = createSlice({
  name: 'antiFingerprinting',
  initialState,
  reducers: {
    setAntiFingerprinting(state: AntiFingerprintingState, action: PayloadAction<boolean>) {
      return action.payload
    },
  },
})

export const { setAntiFingerprinting } = antiFingerprintingSlice.actions
export default antiFingerprintingSlice.reducer
