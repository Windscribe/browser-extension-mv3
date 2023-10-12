import { useState, useEffect } from 'react'
import debounce from 'lodash.debounce'
import { Column } from 'components/Flexbox'
import { ScrollableBox } from 'components'
import Header from './Header'
import LocationsList from './LocationsList'
import FavoritesList from './FavoritesList'
import type { ThemeUiElement } from 'utils/types'
import type { DebouncedInputOnChangeHandler, Tab, SetTab } from './types'

const Locations: ThemeUiElement = () => {
  const [currentTab, setCurrentTab] = useState<Tab>('locations')
  // used to track the first key press to pass as initial input to search field
  const [focusInitKey, setFocusInitKey] = useState<string | null>(null)
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

  // if the user types an alphabetical character it sets focus to the search input
  useEffect(() => {
    const isLetter = (keyCode: number) =>
      (keyCode > 64 && keyCode < 91) || (keyCode > 96 && keyCode < 123) || keyCode === 8

    const onKeypress = (e: { key: string; keyCode: number }) => {
      const validKey = isLetter(e.keyCode)
      if (validKey) {
        setFocusInitKey(e.key)
      }
    }
    window.addEventListener('keypress', onKeypress)
    return () => window.removeEventListener('keypress', onKeypress)
  }, [])

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
      <ScrollableBox sx={{ height: '343px' }}>
        {
          {
            locations: <LocationsList searchText={searchText} />,
            favorites: <FavoritesList />,
          }[currentTab]
        }
      </ScrollableBox>
    </Column>
  )
}
export default Locations
