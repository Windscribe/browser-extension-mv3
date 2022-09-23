import { Column } from 'components/Flexbox'
import LocationsListItem from './LocationsListItem'
import { useSelector } from 'state/hooks'

const LocationsList: React.FC = () => {
  const serverList = useSelector(s => s.servers.serverList)

  return (
    <Column data-testid="locations-list">
      {serverList &&
        serverList.map(location => <LocationsListItem key={location.id} location={location} />)}
    </Column>
  )
}

export default LocationsList
