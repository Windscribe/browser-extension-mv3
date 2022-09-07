import { Column } from 'components/Flexbox'
import LocationsListItem from './LocationsListItem'
import { useSelector } from 'state/hooks'

const LocationsList: React.FC = () => {
  const serverList = useSelector(s => s.serverList) || {} // TODO consider to get rid of empty object
  const locations = Object.values(serverList)

  return (
    <Column data-testid="locations-list">
      {locations.map(({ id, name, groups, country_code: countryCode }) => (
        <LocationsListItem key={id} {...{ name, groups, countryCode }} />
      ))}
    </Column>
  )
}

export default LocationsList
