import prepareQueryString from 'api/prepareQueryString'
import type { LoginParameters, ApiResponse, SessionData, LoginError } from 'api/types'
import constructDebugLog from 'utils/constructDebugLog'

const login = async (
  username: string,
  password: string,
  twoFACode?: string,
): Promise<ApiResponse<SessionData | LoginError>> => {
  const parameters: LoginParameters = {
    username,
    password,
    session_type_id: 2,
    platform: 'chrome',
    ...(twoFACode && { '2fa_code': twoFACode }),
  }
  constructDebugLog('INFO', 'login', 'Sending login request')

  return await prepareQueryString('Session', 'POST', parameters)
}

export default login
