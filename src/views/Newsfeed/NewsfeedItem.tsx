import { Box, Button, useThemeUI } from 'theme-ui'
import { Column } from 'components/Flexbox'
import { unreadIconRadius } from 'styles/constants'
import PlusIcon from 'assets/img/plus-icon.svg'
import getInnerHtmlStyles from './getInnerHtmlStyles'

type NewsfeedItemProps = {
  id: number
  date: number
  title: string
  message: string
  isViewed: boolean
  isExpanded: boolean
  handleItemClick: React.MouseEventHandler
}

const NewsfeedItem: React.FC<NewsfeedItemProps> = ({
  id,
  date,
  title,
  message,
  isViewed,
  isExpanded,
  handleItemClick,
}) => {
  const { colorMode, theme } = useThemeUI()
  const isDark = colorMode === 'dark'

  const currentDate = new Date().toString()
  const daysAgo = Math.floor((Date.parse(currentDate) / 1000 - date) / (3600 * 24)) | 0
  const daysAgoText = daysAgo === 0 ? 'Today' : `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`

  return (
    <Box mb="16px">
      <Button
        data-id={id}
        data-testid={`newsfeed-item-${id}`}
        onClick={handleItemClick}
        sx={{
          position: 'relative',
          display: 'flex',
          cursor: 'pointer',
          width: '100%',
          height: '48px',
          padding: '16px',
          background: 'foreground',
          justifyContent: 'space-between',
          fill: isExpanded ? 'primaryText' : 'secondaryText',
          color: isExpanded ? 'primaryText' : 'secondaryText',
          ...(isExpanded && {
            height: 'auto',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }),
          transition: 'color 0.3s',
          'svg > path': {
            transition: 'fill 0.3s',
          },
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
        <Column
          sx={{
            textAlign: 'start',
          }}
        >
          <Box
            sx={{
              fontWeight: '600',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Box>
          {isExpanded && (
            <Box mt="4px" color="secondaryText">
              {daysAgoText}
            </Box>
          )}
        </Column>

        <Box
          sx={{
            flexShrink: 0,
            height: '16px',
            marginLeft: '16px',
            transition: 'transform ease-in-out 0.2s',
            transform: isExpanded ? 'rotate(45deg)' : 'rotate(0)',
          }}
        >
          <PlusIcon />
        </Box>
      </Button>
      {isExpanded && (
        <Box
          sx={{
            color: 'secondaryText',
            paddingBottom: '16px',
            paddingLeft: '16px',
            paddingRight: '16px',
            backgroundColor: 'foreground',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
          }}
          data-testid={`newsfeed-item-message`}
          css={getInnerHtmlStyles(isDark, theme?.colors)}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </Box>
  )
}

export default NewsfeedItem
