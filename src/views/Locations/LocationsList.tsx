import { useEffect, useState } from 'react'
import { Column } from 'components/Flexbox'
import ServerList from './ServerList'
import { useSelector } from 'state/hooks'
import type { ServerList as ServerListType } from 'api/types'
import { selectSortedLocation } from 'state/slices/servers'
import Fuse from 'fuse.js'

const filterServerListBySearchText = (
  serverList: ServerListType,
  searchText: string,
): ServerListType => {
  const fuseOptions = {
    keys: ['name', 'groups.city', 'groups.nick'],
    threshold: 0.3,
    includeMatches: true,
  }

  const fuse = new Fuse(serverList, fuseOptions)
  const results = fuse.search(searchText)

  return results.map(({ item, matches }) => {
    if (!matches) return item

    const nameMatches = matches.some(match => match.key && match.key === 'name')
    const matchedGroupIndexes = matches
      .filter(match => match.key && match.key.startsWith('groups.'))
      .map(match => match.refIndex)

    let groupsModified = false

    const filteredGroups = item.groups?.filter((group, index) => {
      if (matchedGroupIndexes.includes(index)) {
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
  const { currentLanguage } = useSelector(s => s.currentLanguage)

  const [serverList, setServerList] = useState<ServerListType>(serverListSorted)

  useEffect(() => {
    if (searchText.length > 0) {
      const searchedServerList = filterServerListBySearchText(serverListSorted, searchText)

      setServerList(searchedServerList)
    } else {
      setServerList(serverListSorted)
    }
  }, [searchText, serverListSorted])

  return (
    <Column data-testid="locations-list" sx={{ height: '100%' }}>
      <ServerList
        serverList={serverList}
        searchText={searchText}
        serversListLoading={serversListLoading}
        currentLocationId={currentLocationId}
        autopilotLocation={autopilotLocation}
        autopilotSelected={!!autopilotSelected}
        isPremium={!!isPremium}
        currentLanguage={currentLanguage}
      />
    </Column>
  )
}

export default LocationsList
