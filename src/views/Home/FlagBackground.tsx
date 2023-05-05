import { Box, useThemeUI } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import FlagGradientMask from 'assets/img/flag-gradient-mask.svg'

type FlagBackgroundProps = {
  isConnected: boolean
  FlagSvg?: React.ElementType // Should be more specific - SVG element only. Don't know how to do it yet
}

const FlagBackground: ThemeUiElement<FlagBackgroundProps> = ({ isConnected, FlagSvg = null }) => {
  const { theme } = useThemeUI()
  const { softBlack, softBlackTransparent, lakeBlue, lakeBlueTransparent } = theme.colors || {}

  return (
    <>
      <GradientOverlay
        isTransparent={isConnected}
        color={`${softBlack}, ${softBlackTransparent}`}
      />
      <GradientOverlay isTransparent={!isConnected} color={`${lakeBlue}, ${lakeBlueTransparent}`} />
      <Box
        sx={{
          width: '100%',
          position: 'absolute',
          opacity: 0.5,
          top: '26px',
        }}
      >
        <FlagGradientMask
          sx={{
            position: 'absolute',
            height: '100%',
            zIndex: 1,
          }}
        />
        {FlagSvg && <FlagSvg />}
      </Box>
    </>
  )
}

type GradientOverlayProps = {
  isTransparent: boolean
  color: string
}

const GradientOverlay: ThemeUiElement<GradientOverlayProps> = ({ isTransparent, color }) => (
  <Box
    sx={{
      width: '100%',
      height: '160px',
      position: 'absolute',
      top: '0px',
      zIndex: 1,
      transition: 'opacity 1s ease-in-out',
      opacity: isTransparent ? 0 : 1,
      backgroundImage: `linear-gradient(to bottom, ${color})`,
    }}
  />
)

export default FlagBackground
