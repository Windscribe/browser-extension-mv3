import type { RootState } from './store'
import type { Autopilot, Location, DataCenter } from 'api/types'

export const selectAutopilot = (state: RootState): Autopilot | null => {
  if (!state.currentLocation.id || !state.currentDataCenter.id) return null
  return {
    location: state.currentLocation,
    dataCenter: state.currentDataCenter,
  } as Autopilot
}

export const selectLocationByName = (
  state: RootState,
  locationName: string,
): Location | undefined => state.servers.serverList?.find(server => server.name === locationName)

export const findDataCenterById = (
  location: Location,
  dataCenterId: number,
): DataCenter | undefined => location?.groups?.find(dataCenter => dataCenter.id === dataCenterId)
