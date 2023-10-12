import { Flex } from 'theme-ui'

import { SpaceBetween } from 'components/Flexbox'
import { GoBackButton } from 'components'
import SearchInput from './SearchInput'
import { type HeaderActionsSectionProps } from './types'

const HeaderActionsSection: React.FC<HeaderActionsSectionProps> = ({
  showSearchInput,
  onSearchInputClose,
  onSearchInputChange,
  focusInitKey,
}) => (
  <SpaceBetween py="16px">
    <GoBackButton />
    <Flex
      mr="32px"
      sx={{
        flex: '1 1',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Flex
        sx={{
          fontWeight: 'bold',
          fontSize: '24px',
          color: 'primaryText',
        }}
      >
        Locations
      </Flex>
    </Flex>
    {showSearchInput && (
      <SearchInput
        onSearchInputClose={onSearchInputClose}
        onSearchInputChange={onSearchInputChange}
        focusInitKey={focusInitKey}
      />
    )}
  </SpaceBetween>
)

export default HeaderActionsSection
