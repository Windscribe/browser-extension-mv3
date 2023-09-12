import { Box } from 'theme-ui'

import { type DataCenter } from 'api/types'
import DataCenterItem from './DataCenterItem'

type LocationsListItemDetailsProps = {
  isPremium: boolean
  dataCenters?: DataCenter[]
}

const LocationsListItemDetails: React.FC<LocationsListItemDetailsProps> = ({
  isPremium,
  dataCenters = [],
}) => {
  const sortedDataCenters = dataCenters.sort((a, b) => {
    if (a.city < b.city) return -1
    if (a.city > b.city) return 1
    return 0
  })

  return (
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
      {sortedDataCenters.map(dataCenter => (
        <DataCenterItem key={dataCenter.id} isPremium={isPremium} {...{ dataCenter }} />
      ))}
    </Box>
  )
}

export default LocationsListItemDetails
