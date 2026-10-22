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
import sessionReducer, {
  login,
  getAuthToken,
  setSession,
  replaceSession,
} from './slices/session'
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
import serverCredentialsReducer, {
  fetchServerCredentials,
  setServerCredentials,
} from './slices/serverCredentials'
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
import shouldShowWelcomeReducer from './slices/shouldShowWelcome'

import iconVariantReducer from './slices/iconVariant'
import autoConnectAfterLoginReducer from './slices/autoConnectAfterLogin'
import isRightAfterLoginReducer from './slices/isRightAfterLogin'
import firstInstallDateReducer from './slices/firstInstallDate'
import adPrivacyEnabledReducer from './slices/adPrivacyEnabled'
import migratedFavouriteLocations from './slices/migratedFavoriteLocations'
import migrationReducer from './slices/migration'
import themeReducer from './slices/theme'
import currentLocationMV2Reducer from './slices/currentLocationMV2'
import proxyStatusMV2Reducer from './slices/proxyStatusMV2'
import serverListenerRunReducer from './slices/serverListenerRun'
import PermissionsReducer from './slices/permissions'
import ShowReloadAlertReducer from './slices/reloadAlert'
import privateModeReducer from './slices/privateMode'
import locationTabReducer from './slices/locationTab'
import dismissedUpgradeWarningReducer from './slices/upgradeWarning'
import currentLanguageReducer from './slices/currentLanguage'
import antiFingerprintingReducer from './slices/antiFingerprinting'
import splitPersonalityCompatModeReducer from './slices/splitPersonalityCompatMode'
import urlCleanerEnabledReducer from './slices/urlCleanerEnabled'
import linkSanitizerReducer from './slices/linkSanitizer'

import { serverListListenerMiddleware } from './serverListListenerMiddleware'
import shortcutStatusReducer from './slices/openedByShortcut'

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
  shouldShowWelcome: shouldShowWelcomeReducer,
  splitPersonalityEnabled: splitPersonalityEnabledReducer,
  timeWarpEnabled: timeWarpEnabledReducer,
  userAgent: userAgentReducer,
  userStashes: userStashesReducer,
  view: viewReducer,
  webRtcEnabled: webRtcEnabledReducer,
  workerBlock: workerBlockReducer,
  workingApi: workingApiReducer,
  migrations: migrationReducer,
  migratedFavouriteLocations,
  theme: themeReducer,
  currentLocationMV2: currentLocationMV2Reducer,
  proxyStatusMV2: proxyStatusMV2Reducer,
  serverListenerRun: serverListenerRunReducer,
  permissions: PermissionsReducer,
  showReloadAlert: ShowReloadAlertReducer,
  privateModalShown: privateModeReducer,
  shortcutStatus: shortcutStatusReducer,
  locationTab: locationTabReducer,
  dismissedUpgradeWarning: dismissedUpgradeWarningReducer,
  currentLanguage: currentLanguageReducer,
  antiFingerprinting: antiFingerprintingReducer,
  splitPersonalityCompatMode: splitPersonalityCompatModeReducer,
  urlCleanerEnabled: urlCleanerEnabledReducer,
  linkSanitizer: linkSanitizerReducer,
}

const combinedReducer = combineReducers(reducers)

// Here is a place for logic that mutates all state entirely, not just one slice
const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  if (action.type === 'global/resetStore') {
    // always keep stashes and migration data intact never remove these
    state = {
      userStashes: state?.userStashes,
      // always keep these
      migrations: state?.migrations,
      permissions: state?.permissions,
    } as RootState
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

// Action types whose payloads carry credentials (account password, login
// token, session_auth_hash, proxy username/password). Each entry matches the
// bare type, its `alias/` form, and its async-thunk lifecycle suffixes
// (/pending, /fulfilled, /rejected). Session actions keep the account, plan,
// usage, and location fields listed in SESSION_LOG_FIELDS.
const SENSITIVE_ACTION_PREFIXES = [
  login.typePrefix,
  getAuthToken.typePrefix,
  fetchServerCredentials.typePrefix,
  setServerCredentials.type,
  setSession.type,
  replaceSession.type,
]

const baseActionType = (type: string) =>
  type.startsWith('alias/') ? type.slice('alias/'.length) : type

const isSensitiveAction = (type: string): boolean => {
  const baseType = baseActionType(type)
  return SENSITIVE_ACTION_PREFIXES.some(p => baseType === p || baseType.startsWith(`${p}/`))
}

const SESSION_LOG_FIELDS = [
  'username',
  'user_id',
  'email',
  'email_status',
  'reg_date',
  'status',
  'is_premium',
  'billing_plan_id',
  'premium_expiry_date',
  'rebill',
  'alc',
  'traffic_used',
  'traffic_max',
  'last_reset',
  'loc_hash',
  'loc_rev',
  'our_addr',
  'our_dc',
  'our_ip',
  'our_location',
] as const

const isSessionLogAction = (type: string) =>
  type === setSession.type ||
  type === replaceSession.type ||
  baseActionType(type) === `${login.typePrefix}/fulfilled`

const pickSessionLogData = (payload: Record<string, unknown>) => {
  const data: Record<string, unknown> = {}
  for (const key of SESSION_LOG_FIELDS) {
    if (payload[key] !== undefined) data[key] = payload[key]
  }
  return Object.keys(data).length ? data : undefined
}

const getErrorDetails = (action: AnyAction) => {
  const { errorCode, errorMessage, errorDescription, logStatus } = action.payload ?? {}
  const apiError = errorMessage ? { errorCode, errorMessage, errorDescription, logStatus } : {}
  const errorDetails = action.error ? { ...apiError, error: action.error } : apiError
  return Object.keys(errorDetails).length ? errorDetails : undefined
}

const debugLogMiddleware: Middleware<Dispatch, RootState> = () => next => action => {
  const message = `Redux action: ${action.type}`

  let tag: LogTag = 'background'
  if (action._sender?.url?.includes('popup.html')) tag = 'popup'
  if (action._sender?.url?.includes('debugLog.html')) tag = 'debugLog'
  // Need a check if(contentScript) When contentScript will be added

  const logItem: LogItem = { message, tag }
  // Thunks pass through here as functions with no `type`
  const type = typeof action.type === 'string' ? action.type : ''
  if (isSessionLogAction(type) && action.payload && !action.payload.errorMessage) {
    logItem.data = pickSessionLogData(action.payload)
  } else if (isSensitiveAction(type)) logItem.data = getErrorDetails(action)
  else if (action.payload) logItem.data = action.payload
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
        serverListListenerMiddleware.middleware,
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
