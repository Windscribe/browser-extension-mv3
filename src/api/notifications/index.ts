import { makeApiCall } from 'api/utils'
import type { ApiResponse, ApiCallFunction, NotificationsData } from 'api/types'

type Notifications = ApiCallFunction<NotificationsData, string>

const notifications: Notifications = async (
  session_auth_hash: string,
  workingApi: string,
): Promise<ApiResponse<NotificationsData>> => {
  const parameters = {
    session_auth_hash,
  }

  return await makeApiCall<NotificationsData>('Notifications', parameters, workingApi)
}

export default notifications
