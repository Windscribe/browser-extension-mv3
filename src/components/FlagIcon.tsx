import ProCountryIconDark from 'assets/img/pro-flag-icon-dark.svg'
import { Box } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'

type FlagIconProps = {
  shouldShowProOnlyIcon?: boolean
  Svg: React.ElementType // Should be more specific - SVG element only. Don't know how to do it yet
}

const FlagIcon: ThemeUiElement<FlagIconProps> = ({ Svg, shouldShowProOnlyIcon = false }) => {
  // const ProOnlyIcon = lightOrDark === 'light' ? ProCountryIconDark : ProCountryIconLight
  const ProOnlyIcon = ProCountryIconDark
  return (
    <Box
      sx={{
        width: '32px',
      }}
    >
      {Svg && (
        <>
          <Svg
            sx={{
              height: '16px',
              width: '32px',
              boxShadow: `2px 2px 0px`,
              color: 'halfWhite',

              left: '0px',
              transition: 'box-shadow 0.2s',
            }}
          />
          {shouldShowProOnlyIcon && (
            <ProOnlyIcon
              sx={{
                position: 'absolute',
                left: '-4px',
                bottom: '6px',
              }}
            />
          )}
        </>
      )}
    </Box>
  )
}

export default FlagIcon
