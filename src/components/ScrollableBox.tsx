import { Box, useThemeUI, type BoxProps } from 'theme-ui'
import { useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import { ThemeUiElement } from 'utils/types'

type ScrollableBoxProps = React.PropsWithChildren<
  BoxProps & {
    scrollTop?: number
  }
>

const ScrollableBox: ThemeUiElement<ScrollableBoxProps> = ({
  scrollTop = 0,
  children,
  ...restProps
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { theme, colorMode } = useThemeUI()

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollTop - 215
    }
  }, [scrollTop])

  const scrollbarWidth = 7

  const { background, quarterWhite, quarterSoftBlack } = theme.colors || {}
  const scrollbarThumbColor = colorMode === 'dark' ? quarterWhite : quarterSoftBlack

  return (
    <Box
      // `react-custom-scrollbars` is a pure Javascript custom scrollbar solution and while it
      // enables OS X style scrollbars (overlay) on Windows, pure CSS is much more performant
      // so we use a thin, fixed-gutter custom scrollbar for this list
      //use raw css as sx props dont work with vendor prefixes
      pl="16px"
      pr="16px"
      css={css`
        position: relative;
        height: auto;
        max-height: 378px;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-gutter: stable;
        /* For firefox */
        scrollbar-color: ${scrollbarThumbColor} ${background};
        scrollbar-width: thin;
        /*for chrome */
        &::-webkit-scrollbar: {
          width: ${scrollbarWidth}px;
        }

        &::-webkit-scrollbar-thumb: {
          backgroundcolor: ${scrollbarThumbColor};
          borderbottom: 2px solid;
          bordercolor: ${background};
        }

        &::-webkit-scrollbar-track: {
          borderbottom: 2px solid;
          bordercolor: ${background};
        }
      `}
      ref={scrollContainerRef}
      {...restProps}
    >
      {children}
    </Box>
  )
}
export default ScrollableBox
