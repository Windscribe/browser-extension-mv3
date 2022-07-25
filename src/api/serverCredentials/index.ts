import prepareQueryString from '../prepareQueryString'
import { Parameters } from '../types'

const serverCredentials = async (session_auth_hash: string) => {
  const parameters: Parameters = {
    session_auth_hash,
    platform: 'chrome',
  }

  return await prepareQueryString('ServerCredentials', 'GET', parameters)
}

export default serverCredentials
