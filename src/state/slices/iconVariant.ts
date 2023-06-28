import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

import { pushToDebugLog } from 'services/debugLog'
import { setIcon, setTitleByIconVariant, getIconVariant } from 'services/browserAction'
import type { IconVariant } from 'utils/types'

type IconVariantState = IconVariant
const initialState: IconVariantState = 'proxyOff'

export const CHOOSE_ICON = 'iconVariant/chooseIcon'
export const chooseIcon = createAsyncThunk(CHOOSE_ICON, async (_, { getState, dispatch }) => {
  try {
    const isOnline = getState().isOnline
    const status = getState().proxy.status
    const desktopConnected = !!getState().session.sessionData?.our_ip
    const hasProxyError = !!getState().proxy.errorMessage

    const iconVariant = getIconVariant({
      isOnline,
      status,
      desktopConnected,
      hasProxyError,
    })
    await setIcon(iconVariant)
    await setTitleByIconVariant(iconVariant)
    dispatch(setIconVariant(iconVariant))
  } catch (err) {
    pushToDebugLog({
      message: "Failed while trying to choose and set the extension's icon",
      level: 'ERROR',
      data: JSON.stringify(err, Object.getOwnPropertyNames(err)),
    })
  }
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
