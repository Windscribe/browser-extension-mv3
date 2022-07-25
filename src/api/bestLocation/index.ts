import prepareQueryString from '../prepareQueryString'
import { Parameters } from '../types'

const bestLocation = async (session_auth_hash: string) => {
  const parameters: Parameters = {
    session_auth_hash,
    platform: 'chrome',
  }

  return await prepareQueryString('BestLocation', 'GET', parameters)
}

export default bestLocation
