import { useState } from 'react'
import debounce from 'lodash.debounce'

import { Column } from 'components/Flexbox'
import { ScrollableBox } from 'components'
import Header from './Pieces/Header'
import LocationsList from './Pieces/LocationsList'
import { type ThemeUiElement } from 'utils/types'
import type { DebouncedInputOnChangeHandler, Location, Tab, SetTab } from './types'
import tempMock from './locationsMock'

const locationsMock = tempMock as unknown as Location[]

const Locations: ThemeUiElement = () => {
  const [currentTab, setCurrentTab] = useState<Tab>('locations')

  // used to track the first key press to pass as initial input to search field
  const [focusInitKey, setFocusInitKey] = useState(null)

  // debounce to prevent lagginess from spamming searches on every keypress
  const debouncedSetSearchText: DebouncedInputOnChangeHandler = debounce(event => {
    const searchText = event.target?.value
    // dispatch action, will be implemented later
  }, 250)

  const handleInputClose: () => void = () => {
    setFocusInitKey(null)
    // dispatch setSearchText, will be implemented later
  }

  const handleTabSwitch: SetTab = (tab: Tab) => setCurrentTab(tab)

  const isSearching = false // locationsListState?.searchText?.length > 0
  const locationSorting = 'geography' // Mock

  return (
    <Column
      bg="background"
      sx={{
        maxHeight: '433px', // !important ?
      }}
    >
      <Header
        role="tablist"
        setTab={handleTabSwitch}
        currentTab={currentTab}
        isSearching={isSearching}
        locationSorting={locationSorting}
        showSearchInput={currentTab === 'locations'}
        focusInitKey={focusInitKey}
        onSearchInputChange={debouncedSetSearchText}
        onSearchInputClose={handleInputClose}
      />
      <ScrollableBox>
        {
          {
            locations: <LocationsList locations={locationsMock} />,
            favourites: null, // TBD
          }[currentTab]
        }
      </ScrollableBox>
    </Column>
  )
}
export default Locations
