import { useState } from 'react'
import { Box, Flex, Text } from 'theme-ui'
import { type ThemeUIJSX } from '@theme-ui/core'
import { type ActionCreatorWithPayload } from '@reduxjs/toolkit'

import DropDownItem from './DropDownItem'
import { useDispatch } from 'state/hooks'

import DoubleArrowIcon from 'assets/img/doubleArrow.svg'

type DropDownProps<T> = {
  current: T
  items: T[]
  setValue: ActionCreatorWithPayload<T>
}

function DropDown<T extends string | number>({
  current,
  items,
  setValue,
}: DropDownProps<T>): ThemeUIJSX.Element {
  const dispatch = useDispatch()
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  return (
    <Box>
      <Flex
        onMouseEnter={() => setIsDropDownOpen(true)}
        onMouseLeave={() => setIsDropDownOpen(false)}
        css={{
          color: 'foreground',
          alignItems: 'center',
          fontSize: '14px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          ':hover > div': {
            opacity: '1',
            visibility: 'visible',
          },
        }}
      >
        <Text sx={{ mr: '8px', fontWeight: '400', color: 'secondaryText' }}>{current}</Text>
        <DoubleArrowIcon sx={{ fill: 'secondaryText' }} />
      </Flex>
      <Box
        css={{
          transition: 'visibility 0.3s, opacity 0.3s',
          opacity: isDropDownOpen ? '1' : '0',
          visibility: isDropDownOpen ? 'visible' : 'hidden',
          position: 'relative',
          ':hover': {
            opacity: '1',
            visibility: 'visible',
          },
        }}
      >
        <Box
          sx={{
            p: '4px',
            position: 'absolute',
            backgroundColor: 'white',
            borderRadius: '4px',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            border: 'solid 1px rgba(0, 0, 0, 0.15)',
            width: 'auto',
            minWidth: '60px',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.15)',
          }}
        >
          {items.map(item => (
            <DropDownItem
              key={item}
              value={item}
              current={current === item}
              handleClick={value => dispatch(setValue(value))}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default DropDown
