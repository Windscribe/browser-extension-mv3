import md5 from 'crypto-js/md5'
import type { ApiResponse, Endpoint, Method, ApiCallParameters } from 'api/types'
import sendRequest from 'api/sendRequest'
import { CLIENT_AUTH_SECRET } from 'utils/constants'

const getClientAuthHash = (time: string) => {
  return md5(`${CLIENT_AUTH_SECRET}${time}`).toString()
}

export const prepareQueryString = (Endpoint: Endpoint, parameters: ApiCallParameters): string => {
  const time = Math.round(new Date().getTime() / 1000).toString()
  const clientAuthHash = getClientAuthHash(time)

  let queryString = `${Endpoint}?time=${time}&client_auth_hash=${clientAuthHash}`

  Object.entries(parameters).forEach(([key, value]) => {
    queryString = queryString + `&${key}=${value}`
  })

  return queryString
}

export const makeApiCall = async <ExpectedData>(
  Endpoint: Endpoint,
  parameters: ApiCallParameters,
  workingApi: string,
  method: Method = 'GET',
): Promise<ApiResponse<ExpectedData>> => {
  const query = prepareQueryString(Endpoint, parameters)
  return await sendRequest<ExpectedData>(query, method, workingApi)
}
