import { useSelector } from 'state/hooks'
import DataCenterItem from './DataCenterItem'
import { Box } from 'theme-ui'

const FavoritesList: React.FC = () => {
  const favorites = useSelector(s => s.favoriteLocations)

  return (
    <Box pb="16px">
      {favorites.map(dataCenter => (
        <DataCenterItem key={dataCenter.id} dataCenter={dataCenter} />
      ))}
    </Box>
  )
}
export default FavoritesList
