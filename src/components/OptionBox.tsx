import { Box, Flex, type BoxProps } from 'theme-ui'
import { type ThemeUiElement } from 'utils/types'
import ListItem from './ListItem'
import RoundedBox from './RoundedBox'

type OptionBoxProps = React.PropsWithChildren<BoxProps> & {
  Icon: React.ElementType
  title: string
  subTitle?: string
}

const OptionBox: ThemeUiElement<OptionBoxProps> = ({
  Icon,
  title,
  subTitle,
  children,
  ...props
}) => {
  return (
    <Box
      sx={{
        borderRadius: '8px',
        border: '1px',
        borderColor: 'foreground',
        borderStyle: 'solid',
        width: '100%',
        display: 'inline-block',
        mb: '16px',
      }}
      {...props}
    >
      <RoundedBox>
        <ListItem noBorder>
          <Flex sx={{ gap: '16px' }}>
            <Icon />
            {title}
          </Flex>
          {children}
        </ListItem>
      </RoundedBox>
      {subTitle && (
        <Box sx={{ p: '8px 16px', fontSize: '12px', color: 'secondaryText' }}>{subTitle}</Box>
      )}
    </Box>
  )
}

export default OptionBox
