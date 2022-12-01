import { makeApiCall } from 'api/utils'
import type {
  ApiCallFunction,
  GetServerCredentialsParameters,
  ApiResponse,
  ServerCredentials,
} from 'api/types'

type GetServerCredentials = ApiCallFunction<ServerCredentials, string>

const getServerCredentials: GetServerCredentials = async (
  session_auth_hash: string,
  workingApi: string,
): Promise<ApiResponse<ServerCredentials>> => {
  const parameters: GetServerCredentialsParameters = {
    session_auth_hash,
    platform: 'chrome',
  }

  return await makeApiCall<ServerCredentials>('ServerCredentials', parameters, workingApi)
}

export { getServerCredentials }
