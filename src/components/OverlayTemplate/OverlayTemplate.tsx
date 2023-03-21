import { Flex, Text } from 'theme-ui'

import { Column } from '../Flexbox'
import { useSelector } from 'state/hooks'
import { getOverlayTemplate } from './getOverlayTemplate'
import { type ThemeUiElement } from 'utils/types'

const OverlayTemplate: ThemeUiElement = () => {
  const { template } = useSelector(s => s.overlay)

  if (!template) return <></>

  const { title, message, img, ActionsBlock } = getOverlayTemplate(template)

  return (
    <Column m="40px" sx={{ justifyContent: 'center', alignItems: 'center' }}>
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
      {ActionsBlock && <ActionsBlock />}
    </Column>
  )
}

export default OverlayTemplate
