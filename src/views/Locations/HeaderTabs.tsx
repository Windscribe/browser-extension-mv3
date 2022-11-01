import { Box } from 'theme-ui'

import SortButton from './SortButton'
import { IconButton } from 'components'
import { SpaceBetween } from 'components/Flexbox'
import AllLocationsIcon from 'assets/img/all-locations.svg'
import FavLocationsIcon from 'assets/img/fav-locations.svg'
import { type HeaderTabsProps } from '../types'

const HeaderTabs: React.FC<HeaderTabsProps> = ({
  currentTab,
  isSearching,
  locationSorting,
  setTab,
}) => (
  <SpaceBetween
    mb="14px"
    sx={{
      width: '100%',
    }}
  >
    <Box>
      <IconButton
        role="tab"
        aria-selected={currentTab === 'locations'}
        active={currentTab === 'locations'}
        onClick={() => setTab('locations')}
      >
        <AllLocationsIcon />
      </IconButton>
      {!isSearching && (
        <IconButton
          role="tab"
          aria-selected={currentTab === 'favourites'}
          active={currentTab === 'favourites'}
          onClick={() => setTab('favourites')}
        >
          <FavLocationsIcon />
        </IconButton>
      )}
    </Box>
    {currentTab === 'locations' && !isSearching && (
      <SortButton
        sortBy={locationSorting}
        onClick={() => {
          // use Redux dispatch to store our sort order preference,
          //  will be implemented later
        }}
      />
    )}
  </SpaceBetween>
)

export default HeaderTabs
