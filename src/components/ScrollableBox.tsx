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

  const padding = 16
  const scrollbarWidth = padding / 2
  const scrollbarGutterPadding = padding / 4
  const scrollbarColor = (colors: ColorModesScale | undefined) =>
    colorMode === 'dark' ? colors?.quarterWhite : colors?.quarterSoftBlack

  return (
    <Box
      sx={{
        pl: `${padding}px`,
        pr: `${scrollbarGutterPadding}px`,
        mr: `${scrollbarGutterPadding}px`,
        position: 'relative',
        height: 'auto',
        maxHeight: '378px',
        overflowY: 'auto',
        overflowX: 'hidden',
        /* For firefox (note that we don't currently support firefox for the mv3 extension) */
        // scrollbarGutter: 'auto', // reserve space for the scrollbar
        // scrollbarColor: ({ colors }) => `${scrollbarColor(colors)} ${colors?.background}`,
        // scrollbarWidth: 'thin',

        '&::-webkit-scrollbar': {
          width: `${scrollbarWidth}px`,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: ({ colors }) => `${scrollbarColor(colors)}`,
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-track': {
          marginBottom: '4px',
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
