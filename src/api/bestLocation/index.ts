import prepareQueryString from 'api/prepareQueryString'
import type { GetBestLocationParameters, ApiResponse, BestLocation } from 'api/types'

const bestLocation = async (session_auth_hash: string): Promise<ApiResponse<BestLocation>> => {
  const parameters: GetBestLocationParameters = {
    session_auth_hash,
    platform: 'chrome',
  }

  return await prepareQueryString<BestLocation>('BestLocation', 'GET', parameters)
}

export default bestLocation
