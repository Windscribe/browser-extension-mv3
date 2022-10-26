import { Column } from 'components/Flexbox'
import withSpinner from 'utils/withSpinner'
import LocationsListItem from './LocationsListItem'
import { useSelector } from 'state/hooks'

const LocationsList: React.FC = () => {
  const serverList = useSelector(s => s.servers.serverList)
  const serversListLoading = useSelector(s => s.servers.loading)
  const currentLocationId = useSelector(s => s.currentLocation?.id)
  const autopilotLocation = useSelector(s => s.autopilot.autopilotData?.location)

  // TODO Discuss.
  // serversList should be fetched already on Home page. Is this reassurance redundant?
  // useInitialDataFetching()

  const ServerList = (
    <>
      {autopilotLocation && (
        <LocationsListItem
          location={autopilotLocation}
          isAutopilot
          currentlySelected={currentLocationId === autopilotLocation.id}
        />
      )}
      {serverList?.map(location => (
        <LocationsListItem key={location.id} location={location} />
      ))}
    </>
  )
  const ServerListWithSpinner = withSpinner(
    ServerList,
    serversListLoading,
    'Error while fetching Locations',
  )

  return (
    <Column data-testid="locations-list" sx={{ gap: '16px' }}>
      <ServerListWithSpinner />
    </Column>
  )
}

export default LocationsList
