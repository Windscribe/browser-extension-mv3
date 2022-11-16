export const CLIENT_AUTH_SECRET = '952b4412f002315aa50751032fcaab03'

export const ENVS = {
  API_URL: process.env.API_URL || 'staging.windscribe1.com',
  BACKUP_API_URL: process.env.BACKUP_API_URL,
  DOH_URL: 'dynamic-api-host.windscribe1.com',
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

export const DEVTOOL_PROTOCOL = '1.3'
