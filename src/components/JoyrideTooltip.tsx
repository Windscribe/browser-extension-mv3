import { Box, Button, Text } from 'theme-ui'
import { type TooltipRenderProps } from 'react-joyride'

import { AlignItemsCenter, Column, SpaceBetween } from 'components/Flexbox'

import CheckIcon from 'assets/img/checkmark.svg'
import ArrowIcon from 'assets/img/arrowRight.svg'

const iconSize = {
  width: '15px',
  height: '15px',
}

const JoyrideTooltip: React.FC<TooltipRenderProps> = ({
  index,
  step,
  backProps,
  skipProps,
  primaryProps,
  tooltipProps,
}) => (
  <div {...tooltipProps}>
    <Box
      sx={{
        borderRadius: '5px',
        textAlign: 'center',
        backgroundColor: 'white',
      }}
    >
      <Column p="12px" pb="4px" sx={{ alignItems: 'center', justifyContent: 'center' }}>
        {step.content}
      </Column>
      <SpaceBetween sx={{ alignItems: 'center' }}>
        <Box p="12px">
          <Button
            variant="simple"
            {...skipProps}
            sx={{
              color: 'quarterSoftBlack',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: 'softBlack',
              },
            }}
          >
            <Text sx={{ fontSize: '13px' }}>Leave</Text>
          </Button>
        </Box>
        <AlignItemsCenter
          sx={{
            mr: '12px',
            height: '50px',
            width: '44px',
          }}
        >
          <Button
            variant="simple"
            mr="4px"
            sx={{
              visibility: index > 0 ? 'visible' : 'hidden',
              width: '50px',
              height: '100%',
              '& > svg': {
                fill: 'warmGrey',
                '&:hover': {
                  fill: 'lakeBlue',
                },
              },
            }}
            {...backProps}
          >
            <ArrowIcon
              sx={{
                ...iconSize,
                transform: 'rotate(180deg)',
              }}
            />
          </Button>
          <Button
            data-testid="tutorial-next-button"
            variant="simple"
            sx={{
              width: '50px',
              height: '100%',
              ml: '4px',
              ':focus-visible': {
                outline: 'none',
              },
            }}
            {...primaryProps}
          >
            {primaryProps.title === 'Last' ? (
              <CheckIcon sx={{ ...iconSize, fill: 'lakeBlue' }} />
            ) : (
              <ArrowIcon sx={{ ...iconSize, fill: 'lakeBlue' }} />
            )}
          </Button>
        </AlignItemsCenter>
      </SpaceBetween>
    </Box>
  </div>
)

export default JoyrideTooltip
