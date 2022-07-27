import prepareQueryString from '../prepareQueryString'
import { Parameters, ApiResponse } from '../types'

const login = async (username: string, password: string): Promise<ApiResponse> => {
  const parameters: Parameters = {
    username,
    password,
    session_type_id: 2,
  }

  return await prepareQueryString('Session', 'POST', parameters)
}

export default login
