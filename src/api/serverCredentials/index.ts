import prepareQueryString from 'api/prepareQueryString'
import { type Parameters, ApiResponse, ServerCredentials } from 'api/types'

const serverCredentials = async (
  session_auth_hash: string,
): Promise<ApiResponse<ServerCredentials>> => {
  const parameters: Parameters = {
    session_auth_hash,
    platform: 'chrome',
  }

  return await prepareQueryString<ServerCredentials>('ServerCredentials', 'GET', parameters)
}

export default serverCredentials
