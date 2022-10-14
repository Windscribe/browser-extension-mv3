import sendRequest from 'api/fetchApi'
import type { ApiResponse, ServerList } from 'api/types'

const getServerList = async (
  locHash: string,
  isPro: 0 | 1 = 0,
): Promise<ApiResponse<ServerList>> => {
  const path = `serverlist/chrome/${isPro}/${locHash}`
  return await sendRequest<ServerList>(path, 'GET', true)
}

export { getServerList }
