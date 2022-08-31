import { Box } from 'theme-ui'

import { IconButton, InlineBlock } from 'components'
import SortGeography from 'assets/img/sort-geography.svg'
import SortAlphabet from 'assets/img/sort-alphabet.svg'
import { type ThemeUiElement } from 'utils/types'

const Icons = {
  geography: <SortGeography />,
  alphabet: <SortAlphabet />,
}

type SortButtonProps = {
  sortBy: 'geography' | 'alphabet'
  onClick: () => void
}

const SortButton: ThemeUiElement<SortButtonProps> = ({ sortBy, onClick }) => {
  if (!['geography', 'alphabet'].includes(sortBy)) {
    throw new Error('invalid `sortBy` parameter: "' + sortBy + '"')
  }

  return (
    <InlineBlock>
      <IconButton active={false} role="tab" onClick={onClick}>
        <Box
          aria-label={`Sort by ${sortBy}`}
          ml="auto"
          sx={{
            '& > svg > path': {
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
