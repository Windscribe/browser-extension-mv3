import {
  configureStore,
  combineReducers,
  type AnyAction,
  type Dispatch,
  type Middleware,
} from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { alias } from '@eduardoac-skimlinks/webext-redux'
import { pushToDebugLog } from 'services/debugLog'

import { LogTag, LogItem } from 'utils/types'
import { listenerMiddleware } from './listenerMiddleware'
import aliases from './aliases'
import viewReducer from './slices/view'
import proxyReducer from './slices/proxy'
import blockerReducer from './slices/blocker'
import sessionReducer, { login } from './slices/session'
import serversReducer from './slices/servers'
import newsfeedReducer from './slices/newsfeed'
import allowlistReducer from './slices/allowlist'
import autopilotReducer from './slices/autopilot'
import connectionReducer from './slices/connection'
import workingApiReducer from './slices/workingApi'
import userStashesReducer from './slices/userStashes'
import contextMenuReducer from './slices/contextMenu'
import bestLocationReducer from './slices/bestLocation'
import currentLocationReducer from './slices/currentLocation'
import locationSortingReducer from './slices/locationSorting'
import currentDataCenterReducer from './slices/currentDataCenter'
import serverCredentialsReducer from './slices/serverCredentials'
import favoriteLocationsReducer from './slices/favoriteLocations'
import notificationBlockerEnabledReducer from './slices/notificationBlockerEnabled'
import webRtcEnabledReducer from './slices/webRtcEnabled'
import splitPersonalityEnabledReducer from './slices/splitPersonalityEnabled'
import userAgentReducer from './slices/userAgent'
import languageWarpEnabledReducer from './slices/languageWarpEnabled'
import locationWarpReducer from './slices/locationWarp'
import allowSystemNotificationsReducer from './slices/allowSystemNotifications'
import proxyPortReducer from './slices/proxyPort'
import workerBlockReducer from './slices/workerBlock'
import locationLoadReducer from './slices/locationLoad'
import isOnlineReducer from './slices/isOnline'
import timeWarpEnabledReducer from './slices/timeWarpEnabled'
import overlayReducer from './slices/overlay'
import shouldShowOnboardingReducer from './slices/shouldShowOnboarding'
import iconVariantReducer from './slices/iconVariant'
import autoConnectAfterLoginReducer from './slices/autoConnectAfterLogin'
import isRightAfterLoginReducer from './slices/isRightAfterLogin'
import firstInstallDateReducer from './slices/firstInstallDate'
import adPrivacyEnabledReducer from './slices/adPrivacyEnabled'

const reducers = {
  adPrivacyEnabled: adPrivacyEnabledReducer,
  allowlist: allowlistReducer,
  allowSystemNotifications: allowSystemNotificationsReducer,
  autoConnectAfterLogin: autoConnectAfterLoginReducer,
  autopilot: autopilotReducer,
  bestLocation: bestLocationReducer,
  blocker: blockerReducer,
  connection: connectionReducer,
  contextMenu: contextMenuReducer,
  currentDataCenter: currentDataCenterReducer,
  currentLocation: currentLocationReducer,
  favoriteLocations: favoriteLocationsReducer,
  firstInstallDate: firstInstallDateReducer,
  iconVariant: iconVariantReducer,
  isOnline: isOnlineReducer,
  isRightAfterLogin: isRightAfterLoginReducer,
  languageWarpEnabled: languageWarpEnabledReducer,
  locationLoad: locationLoadReducer,
  locationSorting: locationSortingReducer,
  locationWarp: locationWarpReducer,
  newsfeed: newsfeedReducer,
  notificationBlockerEnabled: notificationBlockerEnabledReducer,
  overlay: overlayReducer,
  proxy: proxyReducer,
  proxyPort: proxyPortReducer,
  serverCredentials: serverCredentialsReducer,
  servers: serversReducer,
  session: sessionReducer,
  shouldShowOnboarding: shouldShowOnboardingReducer,
  splitPersonalityEnabled: splitPersonalityEnabledReducer,
  timeWarpEnabled: timeWarpEnabledReducer,
  userAgent: userAgentReducer,
  userStashes: userStashesReducer,
  view: viewReducer,
  webRtcEnabled: webRtcEnabledReducer,
  workerBlock: workerBlockReducer,
  workingApi: workingApiReducer,
}

const combinedReducer = combineReducers(reducers)

// Here is a place for logic that mutates all state entirely, not just one slice
const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  if (action.type === 'global/resetStore') {
    state = { userStashes: state?.userStashes } as RootState
  } else if (action.type === 'global/applyUserStash') {
    state = { ...state, ...action.payload.toStash } as RootState
  }

  return combinedReducer(state, action)
}

const store = configureStore({
  reducer: rootReducer,
})

const consoleLogger = createLogger({
  collapsed: (_, action, logEntry) => !logEntry?.error,
  // predicate: (_, action) => action.type !== pushToDebugLog.type || action.payload.level === 'ERROR',
})

const debugLogMiddleware: Middleware<Dispatch, RootState> = () => next => action => {
  const message = `Redux action: ${action.type}`

  let tag: LogTag = 'background'
  if (action._sender?.url?.includes('popup.html')) tag = 'popup'
  if (action._sender?.url?.includes('debugLog.html')) tag = 'debugLog'
  // Need a check if(contentScript) When contentScript will be added

  const logItem: LogItem = { message, tag }
  // We don't want to put in debug log user's credentials:
  if (action.payload && !action.type.endsWith(login.typePrefix)) logItem.data = action.payload
  if (action.type?.includes('/rejected')) logItem.level = 'WARN'

  pushToDebugLog(logItem)
  return next(action)
}

export function buildFrom(preloadedState?: RootState): StoreType {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware => {
      const arr = [
        debugLogMiddleware,
        alias(aliases),
        listenerMiddleware.middleware,
        ...getDefaultMiddleware(),
      ]
      if (process.env.NODE_ENV === 'development') {
        arr.push(consoleLogger)
      }
      return arr
    },
  })
}

export type StoreType = typeof store
export type GetState = typeof store.getState
export type RootState = ReturnType<typeof combinedReducer>
export type AppDispatch = typeof store.dispatch

export default store
