import { useState } from 'react'
import { type ThemeUiElement } from 'utils/types'
import { Box, Flex, Text } from 'theme-ui'
import DoubleArrowIcon from 'assets/img/doubleArrow.svg'
import DropDownItem from './DropDownItem'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit/dist/createAction'

type DropDownProps = {
  current: string
  items: string[]
  setValue: ActionCreatorWithPayload<string, string>
}

const DropDown: ThemeUiElement<DropDownProps> = ({ current, items, setValue }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  return (
    <Box>
      <Flex
        onMouseEnter={() => setIsDropDownOpen(true)}
        onMouseLeave={() => setIsDropDownOpen(false)}
        css={{
          color: 'forground',
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
        <DoubleArrowIcon />
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
            border: 'solid 1px black',
            width: 'auto',
            minWidth: '60px',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 4px 0 black',
          }}
        >
          {items.map(item => (
            <DropDownItem key={item} value={item} current={current === item} setValue={setValue} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default DropDown
