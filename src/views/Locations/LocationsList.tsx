import { useEffect, useState } from 'react'
import { Column } from 'components/Flexbox'
import withSpinner from 'utils/withSpinner'
import LocationsListItem from './LocationsListItem'
import { useSelector } from 'state/hooks'
import type { ServerList } from 'api/types'
import { selectSortedLocation } from 'state/slices/servers'
import Fuse from 'fuse.js'

const filterServerListBySearchText = (serverList: ServerList, searchText: string): ServerList => {
  // Setup Fuse.js for searching
  const fuseOptions = {
    keys: ['name', 'groups.city', 'groups.nick'],
    threshold: 0.3,
    includeMatches: true,
  }

  const fuse = new Fuse(serverList, fuseOptions)
  const results = fuse.search(searchText)

  return results.map(({ item, matches }) => {
    if (!matches) return item // Return the item unchanged if there are no matches

    const nameMatches = matches.some(match => match.key && match.key === 'name')
    const matchedGroupIndices = matches
      .filter(match => match.key && match.key.startsWith('groups.'))
      .map(match => match.refIndex)

    let groupsModified = false

    const filteredGroups = item.groups.filter((group, index) => {
      if (matchedGroupIndices.includes(index)) {
        groupsModified = true
        return true
      }
      return nameMatches
    })

    return {
      ...item,
      groups: filteredGroups,
      groupsModified,
    }
  })
}

const LocationsList: React.FC<{ searchText: string }> = ({ searchText }) => {
  const serverListSorted = useSelector(selectSortedLocation)
  const serversListLoading = useSelector(s => s.servers.loading)
  const currentLocationId = useSelector(s => s.currentLocation?.id)
  const autopilotLocation = useSelector(s => s.autopilot.autopilotData?.location)
  const autopilotSelected = useSelector(s => s.autopilot.autopilotSelected)
  const isPremium = useSelector(s => s.session.sessionData?.is_premium)

  const [serverList, setServerList] = useState<ServerList>(serverListSorted)

  useEffect(() => {
    if (searchText.length > 0) {
      const searchedServerList = filterServerListBySearchText(serverListSorted, searchText)

      setServerList(searchedServerList)
    } else {
      setServerList(serverListSorted)
    }
  }, [searchText, serverListSorted])

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
              data-testid="autopilot-list-item"
              location={autopilotLocation}
              isPremium={!!isPremium}
              isAutopilot
              currentlySelected={currentLocationId === autopilotLocation.id && autopilotSelected}
            />
          )}
          {serverList.map((location, i) => (
            <LocationsListItem
              data-testid={`locations-list-item-${i}`}
              key={location.id}
              location={location}
              isPremium={!!isPremium}
              currentlySelected={location.groupsModified}
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
