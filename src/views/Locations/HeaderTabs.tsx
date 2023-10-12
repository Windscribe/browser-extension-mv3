import { Box } from 'theme-ui'

import SortButton from './SortButton'
import { IconButton } from 'components'
import { SpaceBetween } from 'components/Flexbox'
import AllLocationsIcon from 'assets/img/all-locations.svg'
import FavLocationsIcon from 'assets/img/fav-locations.svg'
import { type HeaderTabsProps } from './types'

const HeaderTabs: React.FC<HeaderTabsProps> = ({ currentTab, isSearching, setTab }) => (
  <SpaceBetween
    mb="14px"
    sx={{
      width: '100%',
    }}
  >
    <Box>
      <IconButton
        role="tab"
        data-testid="locations-tab"
        aria-selected={currentTab === 'locations'}
        active={currentTab === 'locations'}
        onClick={() => setTab('locations')}
      >
        <AllLocationsIcon />
      </IconButton>
      {!isSearching && (
        <IconButton
          role="tab"
          data-testid="favorites-tab"
          aria-selected={currentTab === 'favorites'}
          active={currentTab === 'favorites'}
          onClick={() => setTab('favorites')}
        >
          <FavLocationsIcon />
        </IconButton>
      )}
    </Box>
    {currentTab === 'locations' && !isSearching && <SortButton />}
  </SpaceBetween>
)

export default HeaderTabs
