import { Flex } from 'theme-ui'
import { type ThemeUIJSX } from '@theme-ui/core'
import { type ActionCreatorWithPayload } from '@reduxjs/toolkit'

import { useDispatch } from 'state/hooks'

type DropDownItemProps<T> = {
  current: boolean
  value: T
  setValue: ActionCreatorWithPayload<T>
}

function DropDownItem<T extends string>({
  current,
  value,
  setValue,
}: DropDownItemProps<T>): ThemeUIJSX.Element {
  const dispatch = useDispatch()

  return (
    <Flex
      onClick={() => dispatch(setValue(value))}
      aria-label={value}
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
