import { useEffect, useState } from 'react'
import { Box, Flex, Text } from 'theme-ui'

import { Column } from '../Flexbox'
import { getOverlayTemplate } from './getOverlayTemplate'
import { useDispatch } from 'state/hooks'
import { type ThemeUiElement } from 'utils/types'
import { removeOverlay } from 'state/slices/overlay'
import type { OverlayTemplate } from 'utils/types'
import { bodyMaxHeight } from 'styles/constants'

export const Overlay: ThemeUiElement<{ template: OverlayTemplate; index: number }> = ({
  template,
  index,
  ...props
}) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    if (!isOpen) dispatch(removeOverlay(template))
  }, [dispatch, isOpen, template])

  const { title, message, img, ActionsBlock } = getOverlayTemplate(template)

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        width: '100%',
        height: isOpen ? bodyMaxHeight : 0,
        color: 'primaryText',
        backgroundColor: 'background',
        overflow: 'hidden',
        zIndex: 3 + index,
        visibility: isOpen ? 'visible' : 'hidden',
        opacity: isOpen ? 1 : 0,
        transition: 'all 0.3s ease-in-out',
      }}
      {...props}
    >
      <Column mx="40px" sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Flex mb="24px">
          <img src={img} alt={`${title.replaceAll(' ', '-')}-image`} height={108} width={108} />
        </Flex>
        <Column
          mb="24px"
          sx={{
            textAlign: 'center',
          }}
        >
          <Text
            mb="16px"
            sx={{
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            {title}
          </Text>
          <Text
            mb="24px"
            sx={{
              fontSize: '14px',
              margin: '0 auto',
              width: '95%',
            }}
          >
            {message}
          </Text>
        </Column>
        {ActionsBlock && <ActionsBlock close={() => setIsOpen(false)} />}
      </Column>
    </Box>
  )
}
