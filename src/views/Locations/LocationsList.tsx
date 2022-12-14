import { Column } from 'components/Flexbox'
import withSpinner from 'utils/withSpinner'
import LocationsListItem from './LocationsListItem'
import { useSelector } from 'state/hooks'
import { useInitialDataFetching } from 'components/hooks'
import { selectLocationBySearchText } from 'state/slices/servers'

const LocationsList: React.FC<{ searchText: string }> = ({ searchText }) => {
  const serverList = useSelector(state => selectLocationBySearchText(state, searchText))
  const serversListLoading = useSelector(s => s.servers.loading)
  const currentLocationId = useSelector(s => s.currentLocation?.id)
  const autopilotLocation = useSelector(s => s.autopilot.autopilotData?.location)

  // TODO Discuss.
  // serversList and bestLocation should be fetched already on Home page. Is this reassurance redundant?
  useInitialDataFetching()

  const ServerList = (
    <>
      {searchText && !serverList?.length ? (
        <Column
          sx={{
            height: '100%',
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
              currentlySelected={currentLocationId === autopilotLocation.id}
            />
          )}
          {serverList?.map((location, i) => (
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
    <Column data-testid="locations-list" sx={{ gap: '16px', height: '100%' }}>
      <ServerListWithSpinner />
    </Column>
  )
}

export default LocationsList
