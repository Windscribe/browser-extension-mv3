import { useState } from 'react'
import { Box, Text, Flex, type BoxProps } from 'theme-ui'
import { FlagIcon, Rectangle } from 'components'
import flags from 'assets/flags'
import { useGoTo } from 'services/navigation'
import LocationsListItemDetails from './LocationsListItemDetails'
import type { Location, DataCenter } from 'api/types'
import sendMessage from 'services/runtime/sendMessage'

import PlusIcon from 'assets/img/plus-icon.svg'
import AirplaneIcon from 'assets/img/airplane.svg'
import ArrowRightIcon from 'assets/img/arrowRight.svg'

type LocationsListItemProps = BoxProps & {
  location: Location
  isPremium: boolean
  isAutopilot?: boolean
  dataCenters?: DataCenter[] | null
  currentlySelected?: boolean
}

const LocationsListItem: React.FC<LocationsListItemProps> = ({
  location,
  isPremium,
  isAutopilot = false,
  dataCenters = null,
  currentlySelected = false,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(currentlySelected && !isAutopilot)
  const goToHome = useGoTo('Home')

  const Flag: React.ElementType = flags[isAutopilot ? 'AUTO' : location.country_code]

  const handleLocationItemClick = async () => {
    if (isAutopilot) {
      goToHome()
      await sendMessage({ what: 'connectAutopilot' })
    } else {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <Box pb="16px" {...props}>
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
          transition: 'color 0.3s',
          'svg > path': {
            transition: 'fill 0.3s',
          },
          '&:hover': {
            color: 'primaryText',
            'svg > path': {
              fill: 'primaryText',
            },
          },
        }}
      >
        <Flex>
          {isAutopilot ? (
            <AirplaneIcon
              sx={{ fill: currentlySelected || isExpanded ? 'primaryText' : 'secondaryText' }}
            />
          ) : (
            <FlagIcon Svg={Flag} />
          )}
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
      {isExpanded && (
        <LocationsListItemDetails
          isPremium={isPremium}
          dataCenters={dataCenters || location.groups}
        />
      )}
    </Box>
  )
}

export default LocationsListItem
