import { createListenerMiddleware, type TypedStartListening } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from './store'
import { ACTIVATE_SPLIT_PERSONALITY } from './slices/splitPersonalityEnabled'

export const userAgentListenerMiddleware = createListenerMiddleware()

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening = userAgentListenerMiddleware.startListening as AppStartListening

startAppListening({
  predicate: (_, currentState) => {
    return (
      currentState.userAgent.loading === 'fulfilled' &&
      currentState.userAgent.list.length > 0 &&
      !currentState.userAgent.error
    )
  },
  effect: async (_, listenerApi) => {
    // actual script registration is done in the async thunk for this action
    // see src/state/slices/splitPersonalityEnabled.ts
    listenerApi.unsubscribe()
    console.log('unsubscribed split listenere')
    if (listenerApi.getState().splitPersonalityEnabled) {
      console.log('active split persnality')
      listenerApi.dispatch({ type: `alias/${ACTIVATE_SPLIT_PERSONALITY}` })
    }
  },
})
