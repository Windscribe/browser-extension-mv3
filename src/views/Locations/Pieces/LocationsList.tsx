import { Column } from 'components/Flexbox'
import LocationsListItem from './LocationsListItem'
import { type Location } from '../types'

type LocationsListProps = {
  locations: Location[]
}

const LocationsList: React.FC<LocationsListProps> = ({ locations }) => {
  return (
    <Column>
      {locations.map(({ id, name, groups, country_code: countryCode }) => (
        <LocationsListItem key={id} {...{ name, groups, countryCode }} />
      ))}
    </Column>
  )
}

export default LocationsList
