import { ReactNode } from 'react'
import { Box, Flex, type FlexProps } from 'theme-ui'

import { type ThemeUiElement } from 'utils/types'

type BadgeProps = FlexProps & {
  content: ReactNode
  innerContentContainerProps?: FlexProps
}

const Badge: ThemeUiElement<BadgeProps> = ({
  content,
  innerContentContainerProps,
  ...restProps
}) => {
  return (
    <Flex
      sx={{
        position: 'absolute',
        borderRadius: '50%',
        height: '14px',
        width: '14px',
        backgroundColor: 'neonGreen70',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...restProps}
    >
      <Box
        sx={{
          fontSize: '9px',
          color: 'neonGreen',
          fontWeight: '700',
          lineHeight: '100%',
          pt: '1px',
        }}
        {...innerContentContainerProps}
      >
        {content}
      </Box>
    </Flex>
  )
}

export default Badge
