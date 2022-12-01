import md5 from 'crypto-js/md5'
import type { Endpoint } from 'api/types'
import { CLIENT_AUTH_SECRET } from 'utils/constants'

const getClientAuthHash = (time: string): string => {
  return md5(`${CLIENT_AUTH_SECRET}${time}`).toString()
}

const buildQueryString = (Endpoint: Endpoint, parameters?: Record<string, unknown>): string => {
  const time = Math.round(new Date().getTime() / 1000).toString()
  const clientAuthHash = getClientAuthHash(time)

  let queryString = `${Endpoint}?platform=chrome&time=${time}&client_auth_hash=${clientAuthHash}`

  if (parameters) {
    Object.entries(parameters).forEach(([key, value]) => {
      queryString = queryString + `&${key}=${value}`
    })
  }

  return queryString
}

export { getClientAuthHash, buildQueryString }
