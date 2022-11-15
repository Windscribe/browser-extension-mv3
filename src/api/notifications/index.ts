import prepareQueryString from 'api/prepareQueryString'
import type { ApiResponse, Notifications } from 'api/types'

const getNotifications = async (session_auth_hash: string): Promise<ApiResponse<Notifications>> => {
  const parameters = {
    session_auth_hash,
  }

  return await prepareQueryString('Notifications', 'GET', parameters)
}

export { getNotifications }
