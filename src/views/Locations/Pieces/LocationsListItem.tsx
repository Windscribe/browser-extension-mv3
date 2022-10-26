import { useState } from 'react'
import { FlagIcon, Rectangle } from 'components'
import { Box, Text, Flex } from 'theme-ui'
import PlusIcon from 'assets/img/plus-icon.svg'
import flags from 'assets/flags'
import AirplaneIcon from 'assets/img/airplane.svg'
import ArrowRightIcon from 'assets/img/arrowRight.svg'
import { useDispatchAlias } from 'state/hooks'
import { useGoTo } from 'services/navigation'
import { CONNECT_TO_AUTOPILOT } from 'state/slices/autopilot'

import LocationsListItemDetails from './LocationsListItemDetails'
import { type Location } from 'api/types'

type LocationsListItemProps = {
  location: Location
  isAutopilot?: boolean
  currentlySelected?: boolean
}

const LocationsListItem: React.FC<LocationsListItemProps> = ({
  location,
  isAutopilot = false,
  currentlySelected = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(currentlySelected && !isAutopilot)
  const dispatchAlias = useDispatchAlias()
  const goToHome = useGoTo('Home')

  const Flag: React.ElementType = flags[isAutopilot ? 'AUTO' : location.country_code]

  const handleLocationItemClick = async () => {
    if (isAutopilot) {
      await dispatchAlias(CONNECT_TO_AUTOPILOT)
      goToHome()
    } else {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <Box>
      <Rectangle
        onClick={handleLocationItemClick}
        sx={{
          cursor: 'pointer',
          fill: currentlySelected || isExpanded ? 'primaryText' : 'secondaryText',
          color: currentlySelected || isExpanded ? 'primaryText' : 'secondaryText',
          ...(isExpanded && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderBottomWidth: '2px',
            borderBottomColor: 'border',
            borderBottomStyle: 'solid',
          }),
          '&:hover': {
            color: 'primaryText',
            'svg > path': {
              fill: 'primaryText',
            },
          },
        }}
      >
        <Flex>
          {isAutopilot ? <AirplaneIcon /> : <FlagIcon Svg={Flag} />}
          <Text
            sx={{
              fontWeight: '600',
              marginLeft: '16px',
            }}
          >
            {isAutopilot ? 'Autopilot' : location?.name}
          </Text>
        </Flex>
        <Box
          sx={{
            transition: 'transform ease-in-out 0.2s',
            transform: isExpanded ? 'rotate(45deg)  translateX(2px)' : 'rotate(0)',
          }}
        >
          {isAutopilot ? <ArrowRightIcon /> : <PlusIcon />}
        </Box>
      </Rectangle>
      {isExpanded && <LocationsListItemDetails location={location} dataCenters={location.groups} />}
    </Box>
  )
}

export default LocationsListItem
