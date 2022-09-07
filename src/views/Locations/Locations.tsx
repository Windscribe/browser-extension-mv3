import { useState, useEffect } from 'react'
import debounce from 'lodash.debounce'

import { useDispatch, useSelector } from 'state/hooks'
import { Column } from 'components/Flexbox'
import { ScrollableBox } from 'components'
import Header from './Pieces/Header'
import LocationsList from './Pieces/LocationsList'
import { type ThemeUiElement } from 'utils/types'
import type { DebouncedInputOnChangeHandler, Tab, SetTab } from './types'
import { serverList } from 'api'
import { updateById, type ServerListState } from 'state/slices/serverList'

const Locations: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const locHash = useSelector(s => s.session.loc_hash)
  const isPro = useSelector(s => s.session.is_premium)

  const [currentTab, setCurrentTab] = useState<Tab>('locations')

  useEffect(() => {
    getServerList()
  })

  // TODO Consider to create adapter or hook between react and api
  const getServerList = async () => {
    if (locHash) {
      const resp = await serverList(locHash, isPro)
      if (resp && Array.isArray(resp.data)) {
        const serverMap: ServerListState = {}
        resp.data.forEach(server => (serverMap[server.id] = server))
        console.log('%c serverMap ', 'background: #383E49; color: #1ADEAE', serverMap)
        dispatch(updateById(serverMap))
      }
    }
  }

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
    <Column data-testid="locations-page" bg="background">
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
            locations: <LocationsList />,
            favourites: null, // will be implemented later
          }[currentTab]
        }
      </ScrollableBox>
    </Column>
  )
}
export default Locations
