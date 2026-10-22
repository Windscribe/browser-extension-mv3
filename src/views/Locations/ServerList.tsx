import { Box, Spinner, Text } from 'theme-ui'
import { Column } from 'components/Flexbox'
import LocationsListItem from './LocationsListItem'
import { getLocalizedMessage, type SupportedLocales } from 'utils/getLocalisedString'
import type { ServerList as ServerListType, Location } from 'api/types'
import type { LoadingState } from 'utils/types'

type ServerListProps = {
  serverList: ServerListType
  searchText: string
  serversListLoading: LoadingState
  currentLocationId: number | undefined
  autopilotLocation: Location | undefined
  autopilotSelected: boolean
  isPremium: boolean
  currentLanguage: SupportedLocales
}

const ServerList: React.FC<ServerListProps> = ({
  serverList,
  searchText,
  serversListLoading,
  currentLocationId,
  autopilotLocation,
  autopilotSelected,
  isPremium,
  currentLanguage,
}) => {
  if (serversListLoading === 'pending') {
    return (
      <>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 10,
            backgroundColor: 'quarterWhite',
          }}
        >
          <Spinner
            color="white"
            data-testid="spinner"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translateY(-50%) translateX(-50%)',
            }}
          />
        </Box>
        <ServerListContent
          serverList={serverList}
          searchText={searchText}
          currentLocationId={currentLocationId}
          autopilotLocation={autopilotLocation}
          autopilotSelected={autopilotSelected}
          isPremium={isPremium}
          currentLanguage={currentLanguage}
        />
      </>
    )
  }

  if (serversListLoading === 'fulfilled') {
    return (
      <ServerListContent
        serverList={serverList}
        searchText={searchText}
        currentLocationId={currentLocationId}
        autopilotLocation={autopilotLocation}
        autopilotSelected={autopilotSelected}
        isPremium={isPremium}
        currentLanguage={currentLanguage}
      />
    )
  }

  if (serversListLoading === 'rejected') {
    return (
      <Text variant="error">
        {getLocalizedMessage('wsext_error_fetching_locations', currentLanguage)}
      </Text>
    )
  }

  return null
}

type ServerListContentProps = Omit<ServerListProps, 'serversListLoading'>

const ServerListContent: React.FC<ServerListContentProps> = ({
  serverList,
  searchText,
  currentLocationId,
  autopilotLocation,
  autopilotSelected,
  isPremium,
  currentLanguage,
}) => {
  if (searchText && !serverList.length) {
    return (
      <Column
        sx={{
          height: '90%',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          color: 'primaryText',
        }}
      >
        {getLocalizedMessage('wsext_no_results', currentLanguage)}
      </Column>
    )
  }

  return (
    <>
      {autopilotLocation && !searchText && (
        <LocationsListItem
          data-testid="autopilot-list-item"
          location={autopilotLocation}
          isPremium={isPremium}
          isAutopilot
          currentlySelected={currentLocationId === autopilotLocation.id && autopilotSelected}
        />
      )}
      {serverList
        .filter(location => location.groups?.length)
        .map((location, i) => (
          <LocationsListItem
            data-testid={`locations-list-item-${i}`}
            key={location.id}
            location={location}
            isPremium={isPremium}
            proOnly={location.premium_only === 1}
            currentlySelected={location.groupsModified}
          />
        ))}
      <div
        id="anchor"
        sx={{
          overflowAnchor: 'auto',
          minHeight: 5,
        }}
      ></div>
    </>
  )
}

export default ServerList
