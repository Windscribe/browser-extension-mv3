import prepareQueryString from 'api/prepareQueryString'
import { type Parameters, ApiResponse } from 'api/types'

const sessionStatus = async (session_auth_hash: string): Promise<ApiResponse> => {
  const parameters: Parameters = {
    session_auth_hash,
  }

  return await prepareQueryString('Session', 'GET', parameters)
}

export default sessionStatus
