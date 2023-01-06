import { Box } from 'theme-ui'

import { type DataCenter } from 'api/types'
import DataCenterItem from './DataCenterItem'

type LocationsListItemDetailsProps = {
  searchText?: string
  dataCenters?: DataCenter[]
}

const LocationsListItemDetails: React.FC<LocationsListItemDetailsProps> = ({
  searchText = '',
  dataCenters = [],
}) => (
  <Box
    data-testid="accordion-details-list"
    as="ul"
    sx={{
      paddingBottom: '16px',
      paddingLeft: '16px',
      backgroundColor: 'foreground',
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',
    }}
  >
    {dataCenters.map(dataCenter => (
      <DataCenterItem key={dataCenter.id} {...{ dataCenter, searchText }} />
    ))}
  </Box>
)

export default LocationsListItemDetails
