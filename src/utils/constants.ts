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
