import prepareQueryString from 'api/prepareQueryString'
import type { Parameters, ApiResponse, SessionData } from 'api/types'

const login = async (
  username: string,
  password: string,
  twoFACode?: string,
): Promise<ApiResponse<SessionData>> => {
  const parameters: Parameters = {
    username,
    password,
    session_type_id: 2,
    platform: 'chrome',
    ...(twoFACode && { '2fa_code': twoFACode }),
  }

  return await prepareQueryString('Session', 'POST', parameters)
}

export default login
