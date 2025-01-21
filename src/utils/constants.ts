import { AllPossibleMigratedStates } from 'state/slices/migration'

export const CLIENT_AUTH_SECRET = '952b4412f002315aa50751032fcaab03'

export const ENVS = {
  API_URL: process.env.API_URL || 'staging.windscribe.com',
  BACKUP_API_URL: process.env.BACKUP_API_URL,
  DOH_URL: 'dynamic-api-host.windscribe.com',
  ROOT_URL: 'https://www.windscribe.com',
}

export const NODE_ENV = process.env.NODE_ENV

export type BrowserName = 'Chrome' | 'Edge'
export const BROWSER: BrowserName = (process.env.BROWSER as BrowserName) || 'Chrome'

export const STORAGE_CACHE_VERSION = '1'

export const REACT_APP_REDUX_PORT: string =
  process.env.REACT_APP_REDUX_PORT || 'WS_BROWSER_EXTENSION_STORE'
export const WAKE_UP_NEO = 'wake-up-background-service-worker'

export const ACCOUNT_PLAN = {
  FREE: 0,
  PREMIUM: 1,
  UNLIMITED: -1,
} as const

export const ACCOUNT_STATES = {
  ACTIVE: 1,
  EXPIRED: 2,
  BANNED: 3,
}

export const EMAIL = {
  VERIFIED: 1,
  UNCONFIRMED: 0,
}

export const SESSION_ERRORS = {
  COULD_NOT_CREATE_USER_SESSION: 700, //"400::Could not create user session"
  SESSION_INVALID: 701, //"403::Submitted session is invalid. Please re-log in"
  COULD_NOT_LOGIN: 702, //"403::Could not log in with provided credentials"
  COULD_NOT_LOGIN_CONSECUTIVE: 703, //"403::Could not log in with provided credentials. Too many consecutive login failures."
  SESSION_EXPIRED: 704, //"403::Session has expired."
  NOT_AVAILIBLE: 705, //"403::Not avaialble for this connection type."
  USER_SUSPENDED: 706, //403::User has status of suspended, action no permitted."
  IP_SUSPENDED: 707, //403::Suspicious activity detected from your network. Please try again soon."
  NO_AUTH_HASH: 1337,
}

export const DEVTOOL_PROTOCOL = '1.3'

// used for user agent setting (do not want user to assume different platform)
export const platforms = ['Windows', 'Macintosh', 'Linux']

export const PROXY_PORT = Number(process.env.PROXY_PORT) || 443

// Index DB for migration
export const SYNC_KEY = 'WS_DATA_'
export const DB_NAME = 'WS_EXT_DB'
export const DB_VERSION = 1
export const DB_STATE_TABLE = 'WS_STATE'
export const SESSION_REDUCER = 'session'

// General Settings
export const LOCATION_LOAD_REDUCER = 'locationLoadEnabled'
export const SYSTEM_NOTIFICATIONS_REDUCER = 'allowSystemNotifications'
export const DEBUG_CONTEXT_REDUCER = 'showDebugContextMenu'

// Blocker Settings
export const BLOCK_LISTS_REDUCER = 'blockListsEnabled'

// Privacy Settings
export const WORKER_BLOCK_REDUCER = 'workerBlockEnabled'
export const SPLIT_PERSONALITY_REDUCER = 'splitPersonalityEnabled'
export const LANGUAGE_SWITCH_REDUCER = 'languageSwitchEnabled'
export const PROXY_TIME_REDUCER = 'proxyTimeEnabled'
export const LOCATION_SPOOFER_REDUCER = 'locationSpooferEnabled'
export const WEB_RTC_REDUCER = 'webRTCEnabled'
export const NOTIFICATION_BLOCKER_REDUCER = 'notificationBlockerEnabled'

// Connection Settings
export const AUTO_CONNECT_REDUCER = 'autoConnect'
export const SMOKE_WALL_REDUCER = 'smokewall'
export const FAIL_OVER_REDUCER = 'failover'
export const PROXY_PORT_REDUCER = 'proxyPort'

// Other Settings
export const THEME_REDUCER = 'theme'
export const ALLOW_LIST_REDUCER = 'allowlist'
export const FIRST_INSTALL_DATE_REDUCER = 'firstInstallDate'
export const LOCATION_SORTING_REDUCER = 'locationSorting'
export const NEWSFEED_IDS_ALREADY_VIEWED_REDUCER = 'newsfeedIdsAlreadyViewed'
export const FAVORITE_LOCATIONS_REDUCER = 'favoriteLocations'
export const CURRENT_LOCATION_REDUCER = 'currentLocation'
export const PROXY_STATUS_REDUCER = 'proxy'
// Logged out user stash i.e redux state data dumps in both mv2 and mv3
export const USER_STASHES_REDUCER = 'userStashes'

// Content Script Ids

export const workerBlockScriptId = 'workerBlockScript'
export const splitPersonalityScriptId = 'splitPersonalityScript'
export const locationWarpScriptId = 'locationWarpScript' as const
export const languageWarpScriptId = 'languageWarpScript' as const
export const timeZoneWarpScriptId = 'timeZoneWarpScript' as const

export const DEBUG_LOG_MAX_SIZE_BYTES = 1_048_576 // 1MB
export const PRUNE_SIZE_BYTES = 204_800 // 200KB
export const THROTTLE_PROXY_ERROR_TIME_MS = 3000 // ms
export const UBLOCK_LITE_EXTENSION_ID = 'ddkjiahejlhfcafbddmgiahcphecmpfh'
export const NETWORK_CHANGE_EVENT_DELAY_MS = 3000
export const CONTROL_D_DOMAIN = 'controld.com'
export const MIGRATION_ID_V2_TO_V3 = 'V2_TO_V3_MIGRATION'

export const loggedInUserAllMigratedStates: AllPossibleMigratedStates[] = [
  'locationLoad',
  'allowSystemNotifications',
  'showDebugContextMenu',
  'languageWarp',
  'locationWarp',
  'workerBlock',
  'timeWarp',
  'webRtcBlocker',
  'splitPersonality',
  'notificationBlocker',
  'smokeWall',
  'autoConnect',
  'proxyPort',
  'failOver',
  'allowlist',
  'theme',
  'firstInstallDate',
  'locationSorting',
  'newsfeedViewed',
  'favouriteLocations',
  'currentLocation',
  'proxyStatusMV2',
  'blockList',
]

export const stashedUserAllMigratedStates: AllPossibleMigratedStates[] = [
  'locationLoad',
  'allowSystemNotifications',
  'languageWarp',
  'locationWarp',
  'workerBlock',
  'timeWarp',
  'webRtcBlocker',
  'splitPersonality',
  'notificationBlocker',
  'autoConnect',
  'allowlist',
  'theme',
  'newsfeedViewed',
  'favouriteLocations',
  'currentLocation',
  'blockList',
]

export const CONTENT_SETTINGS = 'contentSettings'

export const MAX_LOG_ENTRIES = 1000

export const THREE_DAYS_IN_MILLISECONDS = 259200000

export const MIN_SUPPORTED_CHROME_VERSION = 119

// mullvad is firefox based so its considered firefox
export const IS_FIREFOX =
  navigator.userAgent.includes('Firefox') || navigator.userAgent.includes('MullvadBrowser')
