import { Text, Flex, Button, Box } from 'theme-ui'
import Highlighter from 'react-highlight-words'

import HeartIcon from 'assets/img/heart-outline.svg'
import ArrowRightIcon from 'assets/img/arrowRight.svg'
import CheckmarkIcon from 'assets/img/checkmark.svg'
import { setCurrentLocation } from 'state/slices/currentLocation'
import { setAutopilotSelected } from 'state/slices/autopilot'
import { setCurrentDataCenter } from 'state/slices/currentDataCenter'
import { connectProxy } from 'state/slices/proxy'
import { useDispatch, useSelector } from 'state/hooks'
import { useGoTo } from 'services/navigation'
import { type DataCenter, Location } from 'api/types'

type LocationsListItemDetailsProps = {
  location: Location
  searchText?: string
  dataCenters?: DataCenter[]
}

const LocationsListItemDetails: React.FC<LocationsListItemDetailsProps> = ({
  location,
  searchText = '',
  dataCenters = [],
}) => {
  const dispatch = useDispatch()
  const goToHome = useGoTo('Home')
  const currentDataCenter = useSelector(s => s.currentDataCenter)

  const handleClick = (dataCenter: DataCenter) => {
    dispatch(setCurrentLocation(location))
    dispatch(setCurrentDataCenter(dataCenter))
    dispatch(setAutopilotSelected(false))
    dispatch(connectProxy(dataCenter.hosts[0].hostname))
    goToHome()
  }

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
      {dataCenters.map(dataCenter => (
        <Button
          id={`${dataCenter.id}`}
          key={dataCenter.id}
          as="li"
          onClick={() => handleClick(dataCenter)}
          variant="simple"
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: currentDataCenter?.id === dataCenter.id ? 'primaryText' : 'secondaryText',
            height: '50px',
            padding: '16px 16px 16px 0px',
            borderBottomWidth: '2px',
            borderBottomColor: 'border',
            borderBottomStyle: 'solid',
            transition: 'transform ease-in-out 0.2s',
            listStyleType: 'none',
            '&:hover': {
              color: 'primaryText',
              '& > svg': {
                fill: 'primaryText',
              },
            },
          }}
        >
          <Flex>
            <HeartIcon
              sx={{
                marginRight: '16px',
                fill: 'secondaryText',
              }}
            />
            <Text sx={{ fontWeight: '600' }}>
              <Highlighter searchWords={[searchText]} textToHighlight={dataCenter.city} />
            </Text>
            &nbsp;
            <Text sx={{ fontWeight: '400' }}>
              <Highlighter searchWords={[searchText]} textToHighlight={dataCenter.nick} />
            </Text>
          </Flex>
          {currentDataCenter?.id === dataCenter.id ? (
            <CheckmarkIcon
              data-testid="checkmark-icon"
              sx={{
                fill: 'primaryText',
              }}
            />
          ) : (
            <ArrowRightIcon
              data-testid="arrow-right-icon"
              sx={{
                fill: 'secondaryText',
              }}
            />
          )}
        </Button>
      ))}
    </Box>
  )
}

export default LocationsListItemDetails
