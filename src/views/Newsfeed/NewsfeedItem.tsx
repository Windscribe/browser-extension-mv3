import { Box, Text, useThemeUI } from 'theme-ui'

import { Rectangle } from 'components'
import { unreadIconRadius } from 'styles/constants'
import PlusIcon from 'assets/img/plus-icon.svg'
import getInnerHtmlStyles from './getInnerHtmlStyles'

type NewsfeedItemProps = {
  id: number
  title: string
  message: string
  isViewed: boolean
  isExpanded: boolean
  handleItemClick: React.MouseEventHandler
}

const NewsfeedItem: React.FC<NewsfeedItemProps> = ({
  id,
  title,
  message,
  isViewed,
  isExpanded,
  handleItemClick,
}) => {
  const { colorMode } = useThemeUI()
  const isDark = colorMode === 'dark'

  return (
    <Box mb="16px">
      <Rectangle
        data-id={id}
        onClick={handleItemClick}
        sx={{
          position: 'relative',
          cursor: 'pointer',
          fill: isExpanded ? 'primaryText' : 'secondaryText',
          color: isExpanded ? 'primaryText' : 'secondaryText',
          ...(isExpanded && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }),

          '&:hover': {
            color: 'primaryText',
            'svg > path': {
              fill: 'primaryText',
            },
          },
        }}
      >
        {!isViewed && !isExpanded && (
          <Box
            sx={{
              position: 'absolute',
              borderRadius: '50%',
              height: `${2 * unreadIconRadius}px`,
              width: `${2 * unreadIconRadius}px`,
              top: `calc(50% - ${unreadIconRadius}px)`,
              left: `-${unreadIconRadius}px`,
              backgroundColor: 'neonGreen',
            }}
          />
        )}
        <Text
          sx={{
            fontWeight: '600',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </Text>
        <Box
          sx={{
            flexShrink: 0,
            marginLeft: '16px',
            transition: 'transform ease-in-out 0.2s',
            transform: isExpanded ? 'rotate(45deg)  translateX(2px)' : 'rotate(0)',
          }}
        >
          <PlusIcon />
        </Box>
      </Rectangle>
      {isExpanded && (
        <Box
          sx={{
            color: 'secondaryText',
            paddingBottom: '16px',
            paddingLeft: '16px',
            backgroundColor: 'foreground',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
          }}
          css={getInnerHtmlStyles(isDark)}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </Box>
  )
}

export default NewsfeedItem
