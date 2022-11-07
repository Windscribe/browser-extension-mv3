import { makeApiCall } from 'api/utils'
import type { ApiCallFunction, Credentials, LoginParameters, SessionData } from 'api/types'

type Login = ApiCallFunction<SessionData, Credentials>

const login: Login = async ({ username, password, twoFa }, workingApi) => {
  const parameters: LoginParameters = {
    username,
    password,
    session_type_id: 2,
    platform: 'chrome',
    ...(twoFa && { '2fa_code': twoFa }),
  }

  return await makeApiCall('Session', parameters, workingApi, 'POST')
}

export default login
