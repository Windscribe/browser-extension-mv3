import { useSelector } from 'state/hooks'
import DataCenterItem from './DataCenterItem'

const FavoritesList: React.FC = () => {
  const favorites = useSelector(s => s.favoriteLocations)

  return (
    <>
      {favorites.map(dataCenter => (
        <DataCenterItem key={dataCenter.id} dataCenter={dataCenter} />
      ))}
    </>
  )
}
export default FavoritesList
