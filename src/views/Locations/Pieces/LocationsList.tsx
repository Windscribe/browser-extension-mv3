import { Spinner } from 'theme-ui'
import { useEffect } from 'react'

import { Column } from 'components/Flexbox'
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
      dispatch(fetchServerList({ locHash, isPro }))
    }
  }, [locHash, isPro, serversListLoading, dispatch])

  let content

  if (serversListLoading === 'pending') {
    content = <Spinner />
  } else if (serversListLoading === 'fulfilled') {
    content = serverList?.map(location => (
      <LocationsListItem key={location.id} location={location} />
    ))
  } else if (serversListLoading === 'rejected') {
    // TODO How we should handle error
    content = <div>Error while fetching Locations</div>
  }

  return <Column data-testid="locations-list">{content}</Column>
}

export default LocationsList
