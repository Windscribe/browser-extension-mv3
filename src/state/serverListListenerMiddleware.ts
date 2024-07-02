import { createListenerMiddleware, type TypedStartListening } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from './store'
import { setCurrentDataCenter } from './slices/currentDataCenter'
import { setCurrentLocation } from './slices/currentLocation'
import { setAutopilotSelected } from './slices/autopilot'
import { connect, connectToAutopilot } from 'services/proxyConfig'
import { setAutoConnectAfterLogin } from './slices/autoConnectAfterLogin'
import { MIGRATION_ID } from 'migrations/v2ToV3migration'
import { pushToDebugLog } from 'services/debugLog'

export const serverListListenerMiddleware = createListenerMiddleware()

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening = serverListListenerMiddleware.startListening as AppStartListening

startAppListening({
  predicate: (_, currentState) => {
    return (
      // cant check for two actions at the same time
      // so this can run multiple times
      currentState.servers.loading === 'fulfilled' &&
      currentState.servers.serverList.length > 0 &&
      !currentState.servers.error &&
      currentState.bestLocation.loading === 'fulfilled' &&
      !currentState.bestLocation.error
    )
  },
  effect: async (_, listenerApi) => {
    // because it can run multiple times, we set unsubscribe this listener here so it will only be called once
    // and we only need it for migration and nothing else so it should only run once.
    // cancel future instances from running

    const migrations = listenerApi.getState().migrations
    const migration = migrations.migrations.find(i => i.id === MIGRATION_ID)

    if (migration) {
      listenerApi.unsubscribe()
      // already migrated do nothing
      await pushToDebugLog({
        level: 'INFO',
        message: `Migration already performed - unsubscribing serverList listener`,
        data: JSON.stringify(migration),
        tag: 'background',
      })
      return
    }

    listenerApi.unsubscribe()
    const serverList = listenerApi.getState().servers.serverList
    const currentLocationMV2 = listenerApi.getState().currentLocationMV2
    const proxyStatus = listenerApi.getState().proxyStatusMV2.status

    if (serverList.length > 0) {
      // we have everything we need to connect to the location

      const location = serverList.find(server => server.id === currentLocationMV2.locationId)
      const dataCenter = location?.groups?.find(
        group => group.id === currentLocationMV2.dataCenterId,
      )

      if (location && dataCenter) {
        // we have the location set it now
        listenerApi.dispatch(setCurrentLocation(location))
        listenerApi.dispatch(setCurrentDataCenter(dataCenter))
        listenerApi.dispatch(setAutopilotSelected(false))
        // already connected
        listenerApi.dispatch(setAutoConnectAfterLogin(false))
        if (proxyStatus === 'connected') {
          connect(listenerApi.getState, listenerApi.dispatch, dataCenter.hosts)
        }
      } else {
        listenerApi.dispatch(setAutoConnectAfterLogin(false))
        if (proxyStatus === 'connected') {
          await connectToAutopilot(listenerApi.getState, listenerApi.dispatch)
        }
      }
    }
  },
})
