import prepareQueryString from '../prepareQueryString'
import { Parameters } from '../types'

const notifications = async (session_auth_hash: string) => {
  const parameters: Parameters = {
    session_auth_hash,
  }

  return await prepareQueryString('Notifications', 'GET', parameters)
}

export default notifications
