import { useState } from 'react'
import debounce from 'lodash.debounce'
import { Column } from 'components/Flexbox'
import { ScrollableBox } from 'components'
import Header from './Header'
import LocationsList from './LocationsList'
import type { ThemeUiElement } from 'utils/types'
import type { DebouncedInputOnChangeHandler, Tab, SetTab } from './types'

const Locations: ThemeUiElement = () => {
  const [currentTab, setCurrentTab] = useState<Tab>('locations')
  // used to track the first key press to pass as initial input to search field
  const [focusInitKey, setFocusInitKey] = useState(null)
  const [searchText, setSearchText] = useState<string>('')

  // debounce to prevent lagginess from spamming searches on every keypress
  const debouncedSetSearchText: DebouncedInputOnChangeHandler = debounce(event => {
    setSearchText(event.target?.value)
  }, 250)

  const handleInputClose: () => void = () => {
    setFocusInitKey(null)
    setSearchText('')
  }

  const handleTabSwitch: SetTab = (tab: Tab) => setCurrentTab(tab)

  const isSearching = !!searchText.length

  return (
    <Column data-testid="locations-page" bg="background">
      <Header
        role="tablist"
        setTab={handleTabSwitch}
        currentTab={currentTab}
        isSearching={isSearching}
        showSearchInput={currentTab === 'locations'}
        focusInitKey={focusInitKey}
        onSearchInputChange={debouncedSetSearchText}
        onSearchInputClose={handleInputClose}
      />
      <ScrollableBox>
        {
          {
            locations: <LocationsList searchText={searchText} />,
            favourites: null, // will be implemented later
          }[currentTab]
        }
      </ScrollableBox>
    </Column>
  )
}
export default Locations
