import { Box, Button, Flex, type BoxProps } from 'theme-ui'

import ListItem from './ListItem'
import RoundedBox from './RoundedBox'
import { SpaceBetween } from './Flexbox'
import { ENVS } from 'utils/constants'
import { type ThemeUiElement } from 'utils/types'

import InfoLinkIcon from 'assets/img/infoLink.svg'

type OptionBoxProps = React.PropsWithChildren<BoxProps> & {
  Icon: React.ElementType
  title: string
  subTitle?: string
  path?: string
}

const OptionBox: ThemeUiElement<OptionBoxProps> = ({
  Icon,
  path,
  title,
  subTitle,
  children,
  ...props
}) => {
  return (
    <Box
      sx={{
        borderRadius: '8px',
        border: '1px',
        borderColor: 'foreground',
        borderStyle: 'solid',
        width: '100%',
        display: 'inline-block',
        mb: '16px',
      }}
      {...props}
    >
      <RoundedBox>
        <ListItem noBorder>
          <Flex sx={{ gap: '16px' }}>
            <Icon sx={{ fill: 'primaryText' }} />
            {title}
          </Flex>
          {children}
        </ListItem>
      </RoundedBox>
      {subTitle && (
        <SpaceBetween>
          <Box
            sx={{
              py: '8px',
              pl: '16px',
              pr: '10px',
              fontSize: '12px',
              color: 'secondaryText',
            }}
          >
            {subTitle}
          </Box>
          {path && (
            <Button
              variant="simple"
              mr="16px"
              onClick={() => window.open(`${ENVS.ROOT_URL}/${path}`)}
              sx={{
                minWidth: '16px',
                svg: {
                  transition: '0.3s',
                  fill: 'secondaryText',
                },
                ':hover': {
                  svg: {
                    fill: 'primaryText',
                  },
                },
              }}
            >
              <InfoLinkIcon />
            </Button>
          )}
        </SpaceBetween>
      )}
    </Box>
  )
}

export default OptionBox
