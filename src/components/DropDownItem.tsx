import { type ThemeUiElement } from 'utils/types'
import { Flex } from 'theme-ui'
import { useDispatch } from 'state/hooks'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit/dist/createAction'

type DropDownItemProps = {
  current: boolean
  value: string
  setValue: ActionCreatorWithPayload<string, string>
}

const DropDownItem: ThemeUiElement<DropDownItemProps> = ({ current, value, setValue }) => {
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
