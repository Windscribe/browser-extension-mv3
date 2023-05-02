import { useEffect, useState } from 'react'

import { Column } from 'components/Flexbox'
import withSpinner from 'utils/withSpinner'
import LocationsListItem from './LocationsListItem'
import { useSelector } from 'state/hooks'
import { useInitialDataFetching } from 'components/hooks'
import type { ServerList } from 'api/types'

import { selectLocationBySearchText, selectSortedLocation } from 'state/slices/servers'

const LocationsList: React.FC<{ searchText: string }> = ({ searchText }) => {
  const serverListSorted = useSelector(selectSortedLocation)
  const serverListFiltered = useSelector(s => selectLocationBySearchText(s, searchText))
  const serversListLoading = useSelector(s => s.servers.loading)
  const currentLocationId = useSelector(s => s.currentLocation?.id)
  const autopilotLocation = useSelector(s => s.autopilot.autopilotData?.location)
  const autopilotSelected = useSelector(s => s.autopilot.autopilotSelected)

  const [serverList, setServerList] = useState<ServerList>(serverListSorted)

  useEffect(() => {
    const newServerList = searchText ? serverListFiltered : serverListSorted
    setServerList(newServerList)
  }, [searchText, serverListFiltered, serverListSorted])

  // TODO Discuss.
  // serversList and bestLocation should be fetched already on Home page. Is this reassurance redundant?
  useInitialDataFetching()

  /*
   * Creating components inside render function of another component is an anti-pattern
   * because on every LocationsList re-render React will re-mount ServerList,
   * which is going to be much slower than a normal re-render.
   *
   * TODO Refactor
   */
  const ServerList = (
    <>
      {searchText && !serverList.length ? (
        <Column
          sx={{
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            color: 'primaryText',
          }}
        >
          No Results :(
        </Column>
      ) : (
        <>
          {autopilotLocation && !searchText && (
            <LocationsListItem
              location={autopilotLocation}
              data-testid="autopilot-list-item"
              isAutopilot
              currentlySelected={currentLocationId === autopilotLocation.id && autopilotSelected}
            />
          )}
          {serverList.map((location, i) => (
            <LocationsListItem
              data-testid={`locations-list-item-${i}`}
              key={location.id}
              location={location}
              searchText={searchText}
            />
          ))}
        </>
      )}
    </>
  )

  const ServerListWithSpinner = withSpinner(
    ServerList,
    serversListLoading,
    'Error while fetching Locations',
  )

  return (
    <Column data-testid="locations-list" sx={{ height: '100%' }}>
      <ServerListWithSpinner />
    </Column>
  )
}

export default LocationsList
