import { Flex } from 'theme-ui'
import { type ThemeUIJSX } from '@theme-ui/core'

type DropDownItemProps<T> = {
  current: boolean
  value: T
  handleClick: (value: T) => void
}

function DropDownItem<T extends string | number>({
  current,
  value,
  handleClick,
}: DropDownItemProps<T>): ThemeUIJSX.Element {
  return (
    <Flex
      onClick={() => handleClick(value)}
      aria-label={`${value}`}
      sx={{
        color: current ? 'lakeBlue' : 'halfBlack',
        fontWeight: '700',
        borderRadius: '4px',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 'normal',
        fontSize: '12px',
        height: '23px',
        '&:hover': {
          backgroundColor: 'black8',
        },
        cursor: 'pointer',
        padding: '0 4px',
      }}
    >
      {value}
    </Flex>
  )
}

export default DropDownItem
