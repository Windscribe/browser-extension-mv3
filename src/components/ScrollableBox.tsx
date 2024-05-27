import { Box, ColorModesScale, useThemeUI, type BoxProps } from 'theme-ui'
import { useEffect, useRef } from 'react'
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
  const { colorMode } = useThemeUI()

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollTop - 215
    }
  }, [scrollTop])

  const scrollbarWidth = 7
  const scrollbarColor = (colors: ColorModesScale | undefined) =>
    colorMode === 'dark' ? colors?.quarterWhite : colors?.quarterSoftBlack

  return (
    <Box
      // `react-custom-scrollbars` is a pure Javascript custom scrollbar solution and while it
      // enables OS X style scrollbars (overlay) on Windows, pure CSS is much more performant
      // so we use a thin, fixed-gutter custom scrollbar for this list

      pl="16px"
      pr={`${16 - scrollbarWidth}px`}
      sx={{
        position: 'relative',
        height: 'auto',
        maxHeight: '378px',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarGutter: 'stable', // reserve space for the scrollbar
        /* For firefox */
        scrollbarColor: ({ colors }) => `${scrollbarColor(colors)} ${colors?.background}`,
        scrollbarWidth: 'thin',

        '&::-webkit-scrollbar': {
          width: `${scrollbarWidth}px`,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: ({ colors }) => `${scrollbarColor(colors)}`,
          borderBottom: '2px solid',
          borderColor: theme => {
            return `${theme.colors}`
          },
        },
        '&::-webkit-scrollbar-track': {
          borderBottom: '2px solid',
          borderColor: ({ colors }) => `${colors?.background}`,
        },
      }}
      ref={scrollContainerRef}
      {...restProps}
    >
      {children}
    </Box>
  )
}
export default ScrollableBox
