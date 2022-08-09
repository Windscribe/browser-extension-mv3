import prepareQueryString from 'api/prepareQueryString'
import { type Parameters } from 'api/types'

const notifications = async (session_auth_hash: string) => {
  const parameters: Parameters = {
    session_auth_hash,
  }

  return await prepareQueryString('Notifications', 'GET', parameters)
}

export default notifications
