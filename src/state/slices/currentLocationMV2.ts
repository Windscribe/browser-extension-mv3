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
    setLocationIdV2(state: CurrentLocationStateV2, action: PayloadAction<number | null>) {
      state.locationId = action.payload
    },
    setDataCenterIdV2(state: CurrentLocationStateV2, action: PayloadAction<number | null>) {
      state.dataCenterId = action.payload
    },
  },
})

export const { setDataCenterIdV2, setLocationIdV2 } = currentLocationSliceV2.actions
export default currentLocationSliceV2.reducer
