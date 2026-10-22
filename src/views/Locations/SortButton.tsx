import { Box } from 'theme-ui'

import { useSelector, useDispatch } from 'state/hooks'

import { type ThemeUiElement } from 'utils/types'
import { IconButton, InlineBlock } from 'components'
import { setLocationSorting } from 'state/slices/locationSorting'
import SortAlphabet from 'assets/img/sort-alphabet.svg'
import SortGeography from 'assets/img/sort-geography.svg'
import { getLocalizedMessage } from 'utils/getLocalisedString'

const Icons = {
  geography: <SortGeography />,
  alphabet: <SortAlphabet />,
}

const SortButton: ThemeUiElement = () => {
  const dispatch = useDispatch()
  const sortBy = useSelector(s => s.locationSorting)
  const { currentLanguage } = useSelector(s => s.currentLanguage)

  const handleClick = async () => {
    const locationSorting = sortBy === 'geography' ? 'alphabet' : 'geography'
    await dispatch(setLocationSorting(locationSorting))
  }

  return (
    <InlineBlock>
      <IconButton
        data-testid="sort-locations-button"
        active={false}
        role="tab"
        onClick={handleClick}
      >
        <Box
          aria-label={getLocalizedMessage('wsext_sort_by', currentLanguage, { sort: sortBy })}
          ml="auto"
          sx={{
            'svg > path': {
              transition: 'fill 0.2s',
              fill: 'secondaryText',
            },
            '&:hover > svg > path': {
              fill: 'primaryText',
            },
          }}
        >
          {Icons[sortBy]}
        </Box>
      </IconButton>
    </InlineBlock>
  )
}

export default SortButton
