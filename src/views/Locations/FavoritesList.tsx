import { useSelector } from 'state/hooks'
import DataCenterItem from './DataCenterItem'
import { Box, Flex } from 'theme-ui'

const FavoritesList: React.FC = () => {
  const favorites = useSelector(s => s.favoriteLocations)
  const isPremium = useSelector(s => s.session.sessionData?.is_premium)

  return favorites.length ? (
    <Box pb="16px">
      {favorites.map(dataCenter => (
        <DataCenterItem
          key={dataCenter.id}
          isPremium={!!isPremium}
          dataCenter={dataCenter}
          isFavorite
        />
      ))}
    </Box>
  ) : (
    <Flex
      sx={{
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        color: 'primaryText',
      }}
    >
      No Favorites
    </Flex>
  )
}
export default FavoritesList
