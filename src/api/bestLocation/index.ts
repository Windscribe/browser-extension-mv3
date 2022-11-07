import { makeApiCall } from 'api/utils'
import type { GetBestLocationParameters, ApiCallFunction, BestLocation } from 'api/types'

type GetBestLocation = ApiCallFunction<BestLocation, string>

const getBestLocation: GetBestLocation = async (session_auth_hash, workingApi) => {
  const parameters: GetBestLocationParameters = {
    session_auth_hash,
    platform: 'chrome',
  }

  return await makeApiCall<BestLocation>('BestLocation', parameters, workingApi)
}

export { getBestLocation }
