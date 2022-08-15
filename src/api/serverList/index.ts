import sendRequest from 'api/fetchApi'
import { type ApiResponse } from 'api/types'

const serverList = async (type: number, loc_hash: string): Promise<ApiResponse> => {
  const path = `serverlist/chrome/${type}/${loc_hash}`

  return await sendRequest(path, 'GET', true)
}

export default serverList
