import sendRequest from '../fetchApi'

const serverList = async (type: number, loc_hash: string) => {
  const path = `serverlist/chrome/${type}/${loc_hash}`

  return await sendRequest(path, 'GET', true)
}

export default serverList
