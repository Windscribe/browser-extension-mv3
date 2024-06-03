import { Box, useColorMode } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import ProCountryIconDark from 'assets/img/proFlagIconDark.svg'
import ProCountryIconLight from 'assets/img/proFlagIconLight.svg'

type FlagIconProps = {
  shouldShowProOnlyIcon?: boolean
  Svg: React.ElementType // Should be more specific - SVG element only. Don't know how to do it yet
}

const FlagIcon: ThemeUiElement<FlagIconProps> = ({ Svg, shouldShowProOnlyIcon = false }) => {
  const [colorMode] = useColorMode()
  const ProOnlyIcon = colorMode === 'light' ? ProCountryIconDark : ProCountryIconLight

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
                position: 'relative',
                left: '-4px',
                bottom: '26px',
              }}
            />
          )}
        </>
      )}
    </Box>
  )
}

export default FlagIcon
