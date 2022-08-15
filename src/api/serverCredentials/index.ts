import prepareQueryString from 'api/prepareQueryString'
import { type Parameters, ApiResponse } from 'api/types'

const serverCredentials = async (session_auth_hash: string): Promise<ApiResponse> => {
  const parameters: Parameters = {
    session_auth_hash,
    platform: 'chrome',
  }

  return await prepareQueryString('ServerCredentials', 'GET', parameters)
}

export default serverCredentials
