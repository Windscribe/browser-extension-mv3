import { bestLocation as getBestLocation } from 'api/index'
import { ServerList, Autopilot } from 'api/types'

// TODO move to async thunk
export default async (
  sessionAuthHash: string,
  serverList: ServerList = [],
): Promise<Autopilot | null> => {
  const bestLocation = await getBestLocation(sessionAuthHash)
  const location = serverList.find(x => x.name === bestLocation?.data?.location_name)
  const dataCenter = location?.groups?.find(x => x.id === bestLocation?.data?.dc_id)
  if (location && dataCenter) {
    return { location, dataCenter }
  }
  return null
}
