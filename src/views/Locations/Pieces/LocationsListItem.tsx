import { Accordion } from 'components'
import type { AccordionSummaryPropsType, AccordionDetailsPropsType } from 'components/Accordion'
import LocationsListItemSummary from './LocationsListItemSummary'
import LocationsListItemDetails from './LocationsListItemDetails'
import { type CountryCodeType } from 'utils/types'

type LocationsListItemProps = {
  name: string
  countryCode: CountryCodeType
  dataCentersIds?: number[]
}

const LocationsListItem: React.FC<LocationsListItemProps> = ({
  name,
  dataCentersIds,
  countryCode,
}) => {
  const Summary = (props: AccordionSummaryPropsType) => (
    <LocationsListItemSummary name={name} countryCode={countryCode} {...props} />
  )
  const Details = (props: AccordionDetailsPropsType) => (
    <LocationsListItemDetails dataCentersIds={dataCentersIds} {...props} />
  )

  return <>{dataCentersIds?.length ? <Accordion Summary={Summary} Details={Details} /> : null}</>
}

export default LocationsListItem
