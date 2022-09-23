import { Accordion } from 'components'
import type { AccordionSummaryPropsType, AccordionDetailsPropsType } from 'components/Accordion'
import LocationsListItemSummary from './LocationsListItemSummary'
import LocationsListItemDetails from './LocationsListItemDetails'
import { type Location } from 'api/types'

type LocationsListItemProps = {
  location: Location
}

const LocationsListItem: React.FC<LocationsListItemProps> = ({ location }) => {
  const Summary = (props: AccordionSummaryPropsType) => (
    <LocationsListItemSummary name={location.name} countryCode={location.country_code} {...props} />
  )
  const Details = (props: AccordionDetailsPropsType) => (
    <LocationsListItemDetails location={location} dataCenters={location.groups} {...props} />
  )
  return <Accordion Summary={Summary} Details={Details} />
}

export default LocationsListItem
