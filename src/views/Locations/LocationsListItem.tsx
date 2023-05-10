import { useEffect, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { Box, Text, Flex, type BoxProps } from 'theme-ui'

import { FlagIcon, Rectangle } from 'components'
import flags from 'assets/flags'
import { useGoTo } from 'services/navigation'
import { useDispatchAlias } from 'state/hooks'
import { CONNECT_TO_AUTOPILOT } from 'state/slices/autopilot'
import LocationsListItemDetails from './LocationsListItemDetails'
import type { Location, DataCenter } from 'api/types'

import PlusIcon from 'assets/img/plus-icon.svg'
import AirplaneIcon from 'assets/img/airplane.svg'
import ArrowRightIcon from 'assets/img/arrowRight.svg'

type LocationsListItemProps = BoxProps & {
  location: Location
  isPremium: boolean
  searchText?: string
  isAutopilot?: boolean
  currentlySelected?: boolean
}

const LocationsListItem: React.FC<LocationsListItemProps> = ({
  location,
  isPremium,
  searchText = '',
  isAutopilot = false,
  currentlySelected = false,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(currentlySelected && !isAutopilot)
  const dispatchAlias = useDispatchAlias()
  const goToHome = useGoTo('Home')

  useEffect(() => {
    const isFoundIn = (str: string) => str.toLowerCase().includes(searchText)

    const hasSearchTextInName = (dataCenter: DataCenter) =>
      isFoundIn(dataCenter.city) || isFoundIn(dataCenter.nick)

    if (searchText && location.groups.some(hasSearchTextInName)) setIsExpanded(true)
  }, [searchText, location.groups])

  const Flag: React.ElementType = flags[isAutopilot ? 'AUTO' : location.country_code]

  const handleLocationItemClick = async () => {
    if (isAutopilot) {
      goToHome()
      await dispatchAlias(CONNECT_TO_AUTOPILOT)
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
            {isAutopilot ? (
              'Autopilot'
            ) : (
              <Highlighter searchWords={[searchText]} textToHighlight={location?.name} />
            )}
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
          dataCenters={location.groups}
          searchText={searchText}
        />
      )}
    </Box>
  )
}

export default LocationsListItem
