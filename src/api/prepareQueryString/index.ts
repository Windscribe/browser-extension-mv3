import md5 from 'crypto-js/md5'
import { Parameters } from '../types'
import sendRequest from '../fetchApi'

const getClientAuthHash = (time: string) => {
  return md5(`${'952b4412f002315aa50751032fcaab03'}${time}`).toString()
}

const prepareQueryString = (
  endpoint: string,
  method: string,
  parameters: Parameters
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
