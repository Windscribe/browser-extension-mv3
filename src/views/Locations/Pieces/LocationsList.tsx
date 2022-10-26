import { useEffect } from 'react'

import { Column } from 'components/Flexbox'
import withSpinner from 'utils/withSpinner'
import LocationsListItem from './LocationsListItem'
import { useSelector, useDispatchAlias, useDispatch } from 'state/hooks'
import { FETCH_SERVER_LIST } from 'state/slices/servers'
import { applyBestLocationAsAutopilot } from 'state/slices/autopilot'

const LocationsList: React.FC = () => {
  const dispatchAlias = useDispatchAlias()
  const dispatch = useDispatch()
  const serverList = useSelector(s => s.servers.serverList)
  const serversListLoading = useSelector(s => s.servers.loading)
  const locHash = useSelector(s => s.session.loc_hash)
  const isPremium = useSelector(s => s.session.is_premium)
  const currentLocationId = useSelector(s => s.currentLocation?.id)
  const autopilotLocation = useSelector(s => s.autopilot.autopilotData?.location)

  useEffect(() => {
    // TODO Discuss.
    // serversList should be fetched already on Home page. Is this reassurance redundant?
    if (serversListLoading === 'idle' && locHash) {
      dispatchAlias(FETCH_SERVER_LIST)
      dispatch(applyBestLocationAsAutopilot())
    }
  }, [locHash, isPremium, serversListLoading, dispatch, dispatchAlias])

  const ServerList = (
    <>
      {autopilotLocation && (
        <LocationsListItem
          location={autopilotLocation}
          isAutopilot
          currentlySelected={currentLocationId === autopilotLocation.id}
        />
      )}
      {serverList?.map(location => (
        <LocationsListItem key={location.id} location={location} />
      ))}
    </>
  )
  const ServerListWithSpinner = withSpinner(
    ServerList,
    serversListLoading,
    'Error while fetching Locations',
  )

  return (
    <Column data-testid="locations-list" sx={{ gap: '16px' }}>
      <ServerListWithSpinner />
    </Column>
  )
}

export default LocationsList
