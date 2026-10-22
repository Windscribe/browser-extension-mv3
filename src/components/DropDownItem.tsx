import { Flex } from 'theme-ui'
import { type ThemeUIJSX } from '@theme-ui/core'

type DropDownItemProps<T> = {
  current: boolean
  value: T
  label?: string
  handleClick: (value: T) => void
}

function DropDownItem<T extends string | number>({
  current,
  value,
  label,
  handleClick,
}: DropDownItemProps<T>): ThemeUIJSX.Element {
  const display = label ?? `${value}`
  return (
    <Flex
      onClick={() => handleClick(value)}
      aria-label={display}
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
      {display}
    </Flex>
  )
}

export default DropDownItem
