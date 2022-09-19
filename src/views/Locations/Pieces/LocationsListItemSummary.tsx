import { Box, Text, Flex } from 'theme-ui'

import { FlagIcon } from 'components'
import PlusIcon from 'assets/img/plus-icon.svg'
import flags from 'assets/flags'
import { type CountryCodeType } from 'utils/types'

type LocationsListItemSummaryProps = {
  name?: string
  countryCode: CountryCodeType
  isExpanded: boolean
}

const LocationsListItemSummary: React.FC<LocationsListItemSummaryProps> = ({
  name,
  countryCode,
  isExpanded,
}) => {
  const Flag: React.ElementType = flags[countryCode] || flags['AUTO']

  return (
    <>
      <Flex>
        <FlagIcon Svg={Flag} />
        <Text
          sx={{
            color: `${isExpanded ? 'primaryText' : 'secondaryText'}`,
            fontWeight: '600',
          }}
        >
          {name}
        </Text>
      </Flex>
      <Box
        sx={{
          transition: 'transform ease-in-out 0.2s',
          transform: isExpanded ? 'rotate(45deg)  translateX(2px)' : 'rotate(0)',
          'svg > path': {
            fill: `${isExpanded ? 'primaryText' : 'secondaryText'}`,
          },
        }}
      >
        <PlusIcon />
      </Box>
    </>
  )
}

export default LocationsListItemSummary
