import { useSelector } from 'state/hooks'
import DataCenterItem from './DataCenterItem'
import { Box, Flex } from 'theme-ui'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addLocationToFavorite } from 'state/slices/favoriteLocations'
import { setFavouriteLocationMigrationStatus } from 'state/slices/migratedFavoriteLocations'

const FavoritesList: React.FC = () => {
  const favorites = useSelector(s => s.favoriteLocations)
  const isPremium = useSelector(s => s.session.sessionData?.is_premium)
  const dispatch = useDispatch()
  const serverList = useSelector(s => s.servers)
  const migratedFavouriteLocations = useSelector(s => s.migratedFavouriteLocations)

  // migrate the server list ids
  useEffect(() => {
    if (migratedFavouriteLocations.isMigrated) {
      return
    }
    for (const id of migratedFavouriteLocations.favouriteLocationIds) {
      for (const server of serverList.serverList) {
        if (server.groups) {
          for (const dataCenter of server.groups) {
            if (id === dataCenter.id) {
              dispatch(addLocationToFavorite(dataCenter))
            }
          }
        }
      }
    }
    dispatch(setFavouriteLocationMigrationStatus())
  }, [serverList.serverList, migratedFavouriteLocations, dispatch])

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
