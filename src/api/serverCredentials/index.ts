import prepareQueryString from 'api/prepareQueryString'
import type { GetServerCredentialsParameters, ApiResponse } from 'api/types'

const serverCredentials = async (session_auth_hash: string): Promise<ApiResponse> => {
  const parameters: GetServerCredentialsParameters = {
    session_auth_hash,
    platform: 'chrome', // According API docs here should be CREDENTIAL_TYPE
    // TODO Check parameters
  }

  return await prepareQueryString('ServerCredentials', 'GET', parameters)
}

export default serverCredentials
