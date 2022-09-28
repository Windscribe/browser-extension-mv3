import prepareQueryString from 'api/prepareQueryString'
import type { Parameters, ApiResponse, BestLocation } from 'api/types'

const bestLocation = async (session_auth_hash: string): Promise<ApiResponse<BestLocation>> => {
  const parameters: Parameters = {
    session_auth_hash,
    platform: 'chrome',
  }

  return await prepareQueryString<BestLocation>('BestLocation', 'GET', parameters)
}

export default bestLocation
