import { makeApiCall } from 'api/utils'
import type { ApiResponse, ApiCallFunction, SessionData } from 'api/types'

type GetSessionStatus = ApiCallFunction<SessionData, string>

const getSessionStatus: GetSessionStatus = async (
  session_auth_hash: string,
  workingApi: string,
): Promise<ApiResponse<SessionData>> => {
  const parameters = {
    session_auth_hash,
  }

  return await makeApiCall<SessionData>('Session', parameters, workingApi)
}

export default getSessionStatus
