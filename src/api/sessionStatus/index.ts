import prepareQueryString from 'api/prepareQueryString'
import type { ApiResponse, SessionData } from 'api/types'

const sessionStatus = async (session_auth_hash: string): Promise<ApiResponse<SessionData>> => {
  const parameters = {
    session_auth_hash,
  }

  return await prepareQueryString('Session', 'GET', parameters)
}

export default sessionStatus
