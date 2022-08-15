import prepareQueryString from 'api/prepareQueryString'
import { type Parameters, ApiResponse } from 'api/types'

const bestLocation = async (session_auth_hash: string): Promise<ApiResponse> => {
  const parameters: Parameters = {
    session_auth_hash,
    platform: 'chrome',
  }

  return await prepareQueryString('BestLocation', 'GET', parameters)
}

export default bestLocation
