import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { ProxyPort } from 'utils/types'
import { PROXY_PORT } from 'utils/constants'

export const proxyPortSlice = createSlice({
  name: 'proxyPort',
  initialState: PROXY_PORT as ProxyPort,
  reducers: {
    setProxyPort(state: ProxyPort, action: PayloadAction<ProxyPort>) {
      return action.payload
    },
  },
})

export const { setProxyPort } = proxyPortSlice.actions
export default proxyPortSlice.reducer
