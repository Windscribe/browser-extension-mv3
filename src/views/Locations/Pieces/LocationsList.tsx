import { useEffect } from 'react'

import { Column } from 'components/Flexbox'
import withSpinner from 'utils/withSpinner'
import LocationsListItem from './LocationsListItem'
import { useSelector, useDispatch } from 'state/hooks'
import { fetchServerList } from 'state/slices/servers'

const LocationsList: React.FC = () => {
  const dispatch = useDispatch()
  const serverList = useSelector(s => s.servers.serverList)
  const serversListLoading = useSelector(s => s.servers.loading)
  const locHash = useSelector(s => s.session.loc_hash)
  const isPro = useSelector(s => s.session.is_premium)

  useEffect(() => {
    if (serversListLoading === 'idle' && locHash) {
      dispatch(fetchServerList())
    }
  }, [locHash, isPro, serversListLoading, dispatch])

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
