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
import { css } from '@emotion/react'

type LocationsListItemProps = BoxProps & {
  location: Location
  isPremium: boolean
  isAutopilot?: boolean
  dataCenters?: DataCenter[] | null
  currentlySelected?: boolean
  proOnly?: boolean
}

const LocationsListItem: React.FC<LocationsListItemProps> = ({
  location,
  isPremium,
  isAutopilot = false,
  dataCenters = null,
  currentlySelected = false,
  proOnly,
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
        css={css`
          * .plane {
            animation-name: planemoves;
            animation-duration: 3s;
            animation-iteration-count: infinite;
            transform-origin: 50% 50%;
            animation-play-state: paused;
            
          }
          &:hover .plane {
            animation-play-state: running;
          }
          @keyframes planemoves {
            0% {
              transform: translate(0, -2px);
            }
            50% {
              transform: translate(0, 2px);
            }
            100% {
              transform: translate(0, -2px);
            }
        `}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          fill: currentlySelected || isExpanded ? 'primaryText' : 'secondaryText',
          color: currentlySelected || isExpanded ? 'primaryText' : 'secondaryText',
          padding: 0,
          height: 'initial',
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
        <Flex
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 14,
          }}
        >
          <Flex>
            {isAutopilot ? (
              <AirplaneIcon
                className="plane"
                sx={{ fill: currentlySelected || isExpanded ? 'primaryText' : 'secondaryText' }}
              />
            ) : (
              <FlagIcon isExpanded={isExpanded} Svg={Flag} />
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
          <Flex
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform ease-in-out 0.2s',
              transform: isExpanded ? 'rotate(45deg)' : 'rotate(0)',
            }}
          >
            {isAutopilot ? <ArrowRightIcon /> : <PlusIcon />}
          </Flex>
        </Flex>

        <LocationsListItemDetails
          isExpanded={isExpanded}
          isPremium={isPremium}
          dataCenters={dataCenters || location.groups}
        />
      </Rectangle>
    </Box>
  )
}

export default LocationsListItem
