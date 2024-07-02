import { createListenerMiddleware, type TypedStartListening } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from './store'
import { ACTIVATE_SPLIT_PERSONALITY } from './slices/splitPersonalityEnabled'
import { pushToDebugLog } from 'services/debugLog'

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
    await pushToDebugLog({
      level: 'INFO',
      message: `Unsubscribed userAgent Listener Middleware`,
      tag: 'background',
    })
    if (listenerApi.getState().splitPersonalityEnabled) {
      await pushToDebugLog({
        level: 'INFO',
        message: `dispatched ACTIVATE_SPLIT_PERSONALITY from listener`,
        tag: 'background',
      })
      listenerApi.dispatch({ type: `alias/${ACTIVATE_SPLIT_PERSONALITY}` })
    }
  },
})
