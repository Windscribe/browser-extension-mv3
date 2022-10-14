import { useEffect } from 'react'

import { Column } from 'components/Flexbox'
import withSpinner from 'utils/withSpinner'
import LocationsListItem from './LocationsListItem'
import { useSelector, useDispatchAlias } from 'state/hooks'
import { selectAutopilot } from 'state/selectors'
import { FETCH_SERVER_LIST } from 'state/slices/servers'

const LocationsList: React.FC = () => {
  const dispatchAlias = useDispatchAlias()
  const serverList = useSelector(s => s.servers.serverList)
  const serversListLoading = useSelector(s => s.servers.loading)
  const locHash = useSelector(s => s.session.loc_hash)
  const isPremium = useSelector(s => s.session.is_premium)
  const currentLocationId = useSelector(s => s.currentLocation?.id)
  // TODO Refactor. Consider create autopilot slice
  const autopilot = useSelector(s => selectAutopilot(s))

  useEffect(() => {
    if (serversListLoading === 'idle' && locHash) {
      dispatchAlias(FETCH_SERVER_LIST)
    }
  }, [locHash, isPremium, serversListLoading, dispatchAlias])

  const ServerList = (
    <>
      {autopilot && (
        <LocationsListItem
          location={autopilot.location}
          dataCenter={autopilot.dataCenter}
          isAutopilot
          currentlySelected={currentLocationId === autopilot?.location.id}
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
