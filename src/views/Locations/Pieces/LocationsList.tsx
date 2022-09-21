import { Column } from 'components/Flexbox'
import LocationsListItem from './LocationsListItem'
import { useSelector } from 'state/hooks'

const LocationsList: React.FC = () => {
  const countries = useSelector(s => s.servers.countries)
  const countriesArray = Object.values(countries)

  return (
    <Column data-testid="locations-list">
      {countriesArray.map(({ id, name, dataCentersIds, country_code: countryCode }) => (
        <LocationsListItem key={id} {...{ name, dataCentersIds, countryCode }} />
      ))}
    </Column>
  )
}

export default LocationsList
