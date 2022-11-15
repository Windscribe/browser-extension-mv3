import { Box, Text, type CSSObject } from 'theme-ui'

import { Rectangle } from 'components'
import { unreadIconRadius } from 'styles/constants'
import PlusIcon from 'assets/img/plus-icon.svg'
import getLinkOutIcon from './getLinkOutIcon'

type NewsfeedItemProps = {
  id: number
  title: string
  message: string
  isViewed: boolean
  isExpanded: boolean
  handleItemClick: React.MouseEventHandler
}

const innerHtmlStyles = {
  p: {
    lineHeight: '20px',
    margin: 0,
  },

  '& a:link, a:visited': {
    color: 'secondaryText',
  },

  br: {
    display: 'block',
    my: '8px',
    mx: 0,
    content: '""',
  },

  '& a.ncta': {
    display: 'block',
    height: '40px',
    py: 0,
    pr: '12px',
    pl: '28px',
    lineHeight: '38px',
    textAlign: 'center',
    textDecoration: 'none',
    marginTop: '16px',
    borderRadius: '20px',
    border: 'solid 2px secondaryText',
    color: 'primaryText',
  },

  '& .ncta:after': {
    float: 'right',
    position: 'relative',
    top: '3.5px',
    content: getLinkOutIcon(true), // TODO use color mode from theme
  },
}

const NewsfeedItem: React.FC<NewsfeedItemProps> = ({
  id,
  title,
  message,
  isViewed,
  isExpanded,
  handleItemClick,
}) => (
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
        css={innerHtmlStyles as CSSObject}
        dangerouslySetInnerHTML={{ __html: message }}
      />
    )}
  </Box>
)

export default NewsfeedItem
