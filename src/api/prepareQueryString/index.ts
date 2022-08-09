import md5 from 'crypto-js/md5'
import { type Parameters } from 'api/types'
import sendRequest from 'api/fetchApi'
import { CLIENT_AUTH_SECRET } from 'utils/constants'

const getClientAuthHash = (time: string) => {
  return md5(`${CLIENT_AUTH_SECRET}${time}`).toString()
}

const prepareQueryString = (
  endpoint: 'Session' | 'BestLocation' | 'Notifications' | 'ServerCredentials',
  method: 'GET' | 'POST',
  parameters: Parameters,
) => {
  const time = Math.round(new Date().getTime() / 1000).toString()
  const clientAuthHash = getClientAuthHash(time)

  let queryString: string = `${endpoint}?time=${time}&client_auth_hash=${clientAuthHash}`

  Object.entries(parameters).forEach(([key, value]) => {
    queryString = queryString + `&${key}=${value}`
  })
  return sendRequest(queryString, method)
}

export default prepareQueryString
