import { Column } from 'components/Flexbox'
import HeaderTabs from './HeaderTabs'
import HeaderActionsSection from './HeaderActionsSection'
import { type HeaderProps } from './types'

const Header: React.FC<HeaderProps> = ({
  focusInitKey,
  showSearchInput = false,
  onSearchInputClose,
  onSearchInputChange,
  currentTab,
  isSearching,
  locationSorting,
  setTab,
  ...restProps
}) => {
  return (
    <Column px="16px" {...restProps}>
      <HeaderActionsSection
        {...{ focusInitKey, showSearchInput, onSearchInputClose, onSearchInputChange }}
      />
      <HeaderTabs {...{ setTab, currentTab, isSearching, locationSorting }} />
    </Column>
  )
}

export default Header
