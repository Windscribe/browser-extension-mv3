import prepareQueryString from '../prepareQueryString'
import { Parameters } from '../types'

const sessionStatus = async (session_auth_hash: string) => {
  const parameters: Parameters = {
    session_auth_hash,
  }

  return await prepareQueryString('Session', 'GET', parameters)
}

export default sessionStatus
