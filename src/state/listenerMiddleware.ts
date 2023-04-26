import { createListenerMiddleware, type TypedStartListening } from '@reduxjs/toolkit'

import type { RootState, AppDispatch } from './store'
import { chooseIcon } from './slices/iconVariant'

export const listenerMiddleware = createListenerMiddleware()

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening = listenerMiddleware.startListening as AppStartListening

startAppListening({
  predicate: (action, currentState, previousState) => {
    return (
      currentState.session.our_ip !== previousState.session.our_ip ||
      currentState.proxy.isConnected !== previousState.proxy.isConnected ||
      currentState.proxy.errorMessage !== previousState.proxy.errorMessage ||
      currentState.isOnline !== previousState.isOnline
    )
  },
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(chooseIcon())
  },
})
