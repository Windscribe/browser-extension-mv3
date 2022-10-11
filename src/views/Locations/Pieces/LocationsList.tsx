import { useEffect } from 'react'

import { Column } from 'components/Flexbox'
import withSpinner from 'utils/withSpinner'
import LocationsListItem from './LocationsListItem'
import { useSelector, useDispatchAlias } from 'state/hooks'
import { FETCH_SERVER_LIST } from 'state/slices/servers'

const LocationsList: React.FC = () => {
  const dispatchAlias = useDispatchAlias()
  const serverList = useSelector(s => s.servers.serverList)
  const serversListLoading = useSelector(s => s.servers.loading)
  const locHash = useSelector(s => s.session.loc_hash)
  const isPremium = useSelector(s => s.session.is_premium)

  useEffect(() => {
    if (serversListLoading === 'idle' && locHash) {
      dispatchAlias(FETCH_SERVER_LIST)
    }
  }, [locHash, isPremium, serversListLoading, dispatchAlias])

  const ServerList = (
    <>
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
    <Column data-testid="locations-list">
      <ServerListWithSpinner />
    </Column>
  )
}

export default LocationsList
