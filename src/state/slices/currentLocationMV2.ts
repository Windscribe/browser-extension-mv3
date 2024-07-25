import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type CurrentLocationStateV2 = {
  locationId: number | null
  dataCenterId: number | null
}
const initialState: CurrentLocationStateV2 = {
  locationId: null,
  dataCenterId: null,
}

export const currentLocationSliceV2 = createSlice({
  name: 'currentLocationMV2',
  initialState,
  reducers: {
    setLocationIdMV2(state: CurrentLocationStateV2, action: PayloadAction<number | null>) {
      state.locationId = action.payload
    },
    setDataCenterIdMV2(state: CurrentLocationStateV2, action: PayloadAction<number | null>) {
      state.dataCenterId = action.payload
    },
  },
})

export const { setDataCenterIdMV2, setLocationIdMV2 } = currentLocationSliceV2.actions
export default currentLocationSliceV2.reducer
