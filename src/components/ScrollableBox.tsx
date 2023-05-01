import { Box, type BoxProps } from 'theme-ui'
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

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollTop - 215
    }
  }, [scrollTop])

  const scrollbarWidth = 7

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
        scrollbarColor: 'quarterWhite background',
        scrollbarWidth: 'thin',
        /*for chrome */
        '&::-webkit-scrollbar': {
          width: `${scrollbarWidth}px`,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'quarterWhite',
          borderBottom: '2px solid',
          borderColor: 'background',
        },
        '&::-webkit-scrollbar-track': {
          borderBottom: '2px solid',
          borderColor: 'background',
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
