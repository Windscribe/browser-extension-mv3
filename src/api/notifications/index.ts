import prepareQueryString from 'api/prepareQueryString'
import { type ApiResponse } from 'api/types'

const notifications = async (session_auth_hash: string): Promise<ApiResponse> => {
  const parameters = {
    session_auth_hash,
  }

  return await prepareQueryString('Notifications', 'GET', parameters)
}

export default notifications
