import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type ProxyStatusStateV2 = {
  status: string | null
}
const initialState: ProxyStatusStateV2 = {
  status: null,
}

export const proxyStatusSliceV2 = createSlice({
  name: 'proxyStatusMV2',
  initialState,
  reducers: {
    setProxyStatusMV2(state: ProxyStatusStateV2, action: PayloadAction<string | null>) {
      state.status = action.payload
    },
  },
})

export const { setProxyStatusMV2 } = proxyStatusSliceV2.actions
export default proxyStatusSliceV2.reducer
