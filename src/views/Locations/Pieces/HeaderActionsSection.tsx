import { Flex } from 'theme-ui'

import { SpaceBetween } from 'components/Flexbox'
import { GoBackButton } from 'components'
import SearchInput from './SearchInput'
import { useSelector } from 'state/hooks'
import { type HeaderActionsSectionProps } from '../types'

const HeaderActionsSection: React.FC<HeaderActionsSectionProps> = ({
  showSearchInput,
  onSearchInputClose,
  onSearchInputChange,
  focusInitKey,
}) => {
  const { previous } = useSelector(s => s.view)
  const prevPage = previous[previous.length - 1]

  return (
    <SpaceBetween py="16px">
      <GoBackButton prevPage={prevPage} />
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
}
export default HeaderActionsSection
