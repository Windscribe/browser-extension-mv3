import { createListenerMiddleware, type TypedStartListening } from '@reduxjs/toolkit'

import type { RootState, AppDispatch } from './store'
import { chooseIcon } from './slices/iconVariant'
import { fetchServerList } from 'state/slices/servers'
import { fetchServerCredentials } from 'state/slices/serverCredentials'
import { fetchNotifications } from 'state/slices/newsfeed'
import type { SessionData } from 'api/types'

export const listenerMiddleware = createListenerMiddleware()

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening = listenerMiddleware.startListening as AppStartListening

startAppListening({
  predicate: (action, currentState, previousState) => {
    return (
      currentState.session.our_ip !== previousState.session.our_ip ||
      (currentState.proxy.status !== previousState.proxy.status &&
        (currentState.proxy.status === 'on' || currentState.proxy.status === 'off')) ||
      currentState.proxy.errorMessage !== previousState.proxy.errorMessage ||
      currentState.isOnline !== previousState.isOnline
    )
  },
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(chooseIcon())
  },
})

startAppListening({
  predicate: (action, currentState, previousState) => {
    const sessionPropertiesToWatch: Array<keyof SessionData> = [
      'billing_plan_id',
      'is_premium',
      'last_reset',
      'loc_hash',
      'loc_rev',
      'our_addr',
      'our_dc',
      'our_location',
      'session_auth_hash',
      'status',
      'traffic_max',
    ]
    return sessionPropertiesToWatch.some(p => currentState.session[p] !== previousState.session[p])
  },
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(fetchServerCredentials())
    listenerApi.dispatch(fetchServerList())
    listenerApi.dispatch(fetchNotifications())
  },
})
