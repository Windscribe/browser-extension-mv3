import { useSelector } from 'state/hooks'
import DataCenterItem from './DataCenterItem'

const FavouritesList: React.FC = () => {
  const favourites = useSelector(s => s.favoriteLocations)

  return (
    <>
      {favourites.map((dataCenter, i) => (
        <DataCenterItem
          data-testid={`favourites-locations-list-item-${i}`} // TODO Check if using
          key={dataCenter.id}
          dataCenter={dataCenter}
        />
      ))}
    </>
  )
}
export default FavouritesList
