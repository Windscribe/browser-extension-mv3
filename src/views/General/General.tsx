import { Box, Button, Flex } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import { Header } from 'components'
import EllipseIcon from 'assets/img/ellipse.svg'
import LinkIcon from 'assets/img/link.svg'

const General: ThemeUiElement = () => {
  return (
    <Box data-testid="general-page" bg="background">
      <Header title="General" />
      <Box mx="16px">
        <Flex sx={{ justifyContent: 'center', mb: '16px' }}>
          <EllipseIcon />
        </Flex>
        <Box sx={{ display: 'inline-block', width: '100%', mb: '16px' }}>
          <Button
            onClick={() => window.open('https://windscribe.com/terms/oss')}
            variant="simple"
            sx={{
              display: 'flex',
              borderRadius: '8px',
              border: '1px',
              borderColor: 'foreground',
              borderStyle: 'solid',
              width: '100%',
              color: 'secondaryText',
              fontSize: '14px',
              alignItems: 'center',
              px: '16px',
              fontWeight: 'bold',
              height: '48px',
              justifyContent: 'space-between',
              ':hover': {
                color: 'primaryText',
              },
              '&:hover > svg > path': {
                fill: 'primaryText',
              },
            }}
          >
            View Licenses
            <LinkIcon sx={{ fill: 'secondaryText' }} />
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default General
