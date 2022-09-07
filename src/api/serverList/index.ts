import sendRequest from 'api/fetchApi'
import type { ApiResponse, ServerListData } from 'api/types'

const serverList = async (
  locHash: string,
  isPro: 0 | 1 = 0,
): Promise<ApiResponse<ServerListData>> => {
  const path = `serverlist/chrome/${isPro}/${locHash}`

  return await sendRequest<ServerListData>(path, 'GET', true)
}

export default serverList
