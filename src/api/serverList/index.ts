import sendRequest from 'api/sendRequest'
import type { ApiResponse, ApiCallFunction, ServerList, ServerListParameters } from 'api/types'

type GetServerList = ApiCallFunction<ServerList, ServerListParameters>

const getServerList: GetServerList = async (
  { locHash, isPro = 0 },
  workingApi,
): Promise<ApiResponse<ServerList>> => {
  const path = `serverlist/chrome/${isPro}/${locHash}`
  return await sendRequest<ServerList>(path, 'GET', workingApi, true)
}

export { getServerList }
