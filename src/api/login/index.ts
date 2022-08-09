import prepareQueryString from 'api/prepareQueryString'
import { type Parameters, ApiResponse } from 'api/types'

const login = async (username: string, password: string): Promise<ApiResponse> => {
  const parameters: Parameters = {
    username,
    password,
    session_type_id: 2,
  }

  return await prepareQueryString('Session', 'POST', parameters)
}

export default login
