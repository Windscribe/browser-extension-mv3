import { Button, Box, useThemeUI } from 'theme-ui'
import { keyframes } from '@emotion/react'
import { useState } from 'react'

import type { ThemeUiElement } from 'utils/types'
import splitIconLightBase64 from 'assets/img/splitIconLightBase64'
import splitIconDarkBase64 from 'assets/img/splitIconDarkBase64'

const playSplitAnim = keyframes`
  0%{
    background-position: 0px 0px;
  }

  100% {
    background-position: -1456px 0px;
  }
`

type GetNewButtonProps = {
  onClick: React.MouseEventHandler
  durationMs?: number
}
const GetNewButton: ThemeUiElement<GetNewButtonProps> = ({ onClick, durationMs = 2000 }) => {
  const [isSplitIconAnimating, setSplitAnimating] = useState(false)
  const { colorMode } = useThemeUI()
  const isDark = colorMode === 'dark'

  return (
    <Button
      variant="simple"
      onClick={e => {
        setSplitAnimating(true)
        onClick(e)
      }}
    >
      <Box
        sx={{
          animationDuration: `${durationMs}ms`,
          animationName: isSplitIconAnimating ? playSplitAnim.toString() : 'none',
          animationTimingFunction: 'steps(91)',
          animationFillMode: 'forwards',
          width: '16px',
          height: '16px',
          backgroundImage: `url(${isDark ? splitIconDarkBase64 : splitIconLightBase64})`,
          backgroundRepeat: 'no-repeat',
          cursor: 'pointer',
        }}
        onAnimationEnd={() => setSplitAnimating(false)}
      />
    </Button>
  )
}

export default GetNewButton
