import { Column } from 'components/Flexbox'
import LocationsListItem from './LocationsListItem'
import { useSelector } from 'state/hooks'

const LocationsList: React.FC = () => {
  const serverList = useSelector(s => s.servers.serverList)
  const autopilot = useSelector(s => s.servers.autopilot)
  const currentLocationId = useSelector(s => s.servers.currentLocation?.id)

  return (
    <Column data-testid="locations-list" sx={{ gap: '16px' }}>
      {autopilot && (
        <LocationsListItem
          location={autopilot.location}
          dataCenter={autopilot.dataCenter}
          isAutopilot
          currentlySelected={currentLocationId === autopilot?.location.id}
        />
      )}
      {serverList?.map(location => (
        <LocationsListItem
          key={location.id}
          location={location}
          currentlySelected={
            currentLocationId === location.id && currentLocationId !== autopilot?.location.id
          }
        />
      ))}
    </Column>
  )
}

export default LocationsList
