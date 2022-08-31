import { Accordion } from 'components'
import type { AccordionSummaryPropsType, AccordionDetailsPropsType } from 'components/Accordion'
import LocationsListItemSummary from './LocationsListItemSummary'
import LocationsListItemDetails from './LocationsListItemDetails'
import { type Datacenter } from '../types'
import { type CountryCodeType } from 'utils/types'

type LocationsListItemProps = {
  name: string
  countryCode: CountryCodeType
  groups: Datacenter[]
}

const LocationsListItem: React.FC<LocationsListItemProps> = ({ name, groups, countryCode }) => {
  const Summary = (props: AccordionSummaryPropsType) => (
    <LocationsListItemSummary name={name} countryCode={countryCode} {...props} />
  )
  const Details = (props: AccordionDetailsPropsType) => (
    <LocationsListItemDetails datacenters={groups} {...props} />
  )

  return <Accordion Summary={Summary} Details={Details} />
}

export default LocationsListItem
