import md5 from 'crypto-js/md5'
import type { ApiResponse, Endpoint, Method } from 'api/types'
import sendRequest from 'api/fetchApi'
import { CLIENT_AUTH_SECRET } from 'utils/constants'

const getClientAuthHash = (time: string) => {
  return md5(`${CLIENT_AUTH_SECRET}${time}`).toString()
}

const prepareQueryString = <DataType>(
  Endpoint: Endpoint,
  method: Method,
  parameters: Record<string, string | number>,
): Promise<ApiResponse<DataType>> => {
  const time = Math.round(new Date().getTime() / 1000).toString()
  const clientAuthHash = getClientAuthHash(time)

  let queryString = `${Endpoint}?time=${time}&client_auth_hash=${clientAuthHash}`

  Object.entries(parameters).forEach(([key, value]) => {
    queryString = queryString + `&${key}=${value}`
  })
  return sendRequest<DataType>(queryString, method)
}

export default prepareQueryString
