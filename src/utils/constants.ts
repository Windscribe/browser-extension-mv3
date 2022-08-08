export const CLIENT_AUTH_SECRET = '952b4412f002315aa50751032fcaab03'

export const ENVS = {
  STG: {
    API_URL: 'https://api-staging.windscribe.com',
    ASSETS_URL: 'https://assets-staging.windscribe.com',
    ROOT_URL: 'https://www-staging.windscribe.com',
  },
  PROD: {
    API_URL: 'https://api.windscribe.com',
    ASSETS_URL: 'https://assets.windscribe.com',
    BACKUP_API_URL: 'https://api.totallyacdn.com',
    BACKUP_ASSETS_URL: 'https://assets.totallyacdn.com',
    ROOT_URL: 'https://www.windscribe.com',
  },
}

export type BrowserName = 'Chrome' | 'Edge'
export const BROWSER: BrowserName = (process.env.BROWSER as BrowserName) || 'Chrome'

export const STORAGE_CACHE_VERSION = '1'

export const REACT_APP_REDUX_PORT: string =
  process.env.REACT_APP_REDUX_PORT || 'WS_BROWSER_EXTENSION_STORE'
export const WAKE_UP_NEO = 'wake-up-background-service-worker'
