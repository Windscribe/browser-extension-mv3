import { Box } from 'theme-ui'

import { type DataCenter } from 'api/types'
import DataCenterItem from './DataCenterItem'
import { useEffect, useRef, useState } from 'react'

type LocationsListItemDetailsProps = {
  isPremium: boolean
  dataCenters?: DataCenter[]
  isExpanded: boolean
}

const LocationsListItemDetails: React.FC<LocationsListItemDetailsProps> = ({
  isPremium,
  dataCenters = [],
  isExpanded,
}) => {
  const sortedDataCenters = dataCenters.sort((a, b) => {
    if (a.city < b.city) return -1
    if (a.city > b.city) return 1
    return 0
  })

  const [datacentersHeight, setDatacentersHeight] = useState(0)
  const dataCentersRef = useRef<HTMLUListElement>()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // on first render, we mark the height of the datacenters for this location in
    // order to later conditionally set `max-height` on expand/collapse
    if (dataCentersRef.current) setDatacentersHeight(dataCentersRef.current.scrollHeight)
  }, [dataCenters])

  return (
    <Box
      ref={dataCentersRef}
      data-testid="accordion-details-list"
      as="ul"
      sx={{
        paddingBottom: `${isExpanded ? 16 : 0}px`,
        /* padding is 0 on render so datacentersHeight does not take it into account */
        maxHeight: `${isExpanded ? datacentersHeight + 16 : 0}px`,
        paddingLeft: '16px',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        transition: 'max-height 0.2s ease-out, padding-bottom 0.2s ease-out',
      }}
    >
      <Box sx={{ height: 2, backgroundColor: 'border', width: '100%' }} />
      {sortedDataCenters.map(dataCenter => (
        <DataCenterItem key={dataCenter.id} isPremium={isPremium} {...{ dataCenter }} />
      ))}
    </Box>
  )
}

export default LocationsListItemDetails
