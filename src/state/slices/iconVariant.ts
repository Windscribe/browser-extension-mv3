import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

import { setIcon, setTitleByIconVariant, getIconVariant } from 'services/browserAction'
import type { IconVariant } from 'utils/types'

type IconVariantState = IconVariant
const initialState: IconVariantState = 'proxyOff'

export const CHOOSE_ICON = 'iconVariant/chooseIcon'
export const chooseIcon = createAsyncThunk(CHOOSE_ICON, async (_, { getState, dispatch }) => {
  const isOnline = getState().isOnline
  const proxyConnected = getState().proxy.isConnected
  const desktopConnected = !!getState().session.our_ip
  const hasProxyError = !!getState().proxy.errorMessage

  const iconVariant = getIconVariant({ isOnline, proxyConnected, desktopConnected, hasProxyError })
  await setIcon(iconVariant)
  await setTitleByIconVariant(iconVariant)
  dispatch(setIconVariant(iconVariant))
})

export const iconVariantSlice = createSlice({
  name: 'iconVariant',
  initialState: initialState as IconVariantState,
  reducers: {
    setIconVariant(state: IconVariantState, action: PayloadAction<IconVariant>) {
      return action.payload
    },
  },
})

export const { setIconVariant } = iconVariantSlice.actions
export default iconVariantSlice.reducer
