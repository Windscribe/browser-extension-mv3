import { Button as ThemeUiButton, Flex, Text } from 'theme-ui'

import ExternalLinkSvg from 'assets/img/externalLinkIcon.svg'
import { type Colors } from 'styles'
import { type ThemeUiElement } from 'utils/types'

type ButtonProps = {
  bg?: Colors
  color?: string
  text?: string
  subtext?: string
  url: string
  dataTestId?: string
}

const Button: ThemeUiElement<ButtonProps> = ({ bg, color, text, subtext, url, dataTestId }) => {
  const gotoLink = async () => {
    await chrome.tabs.create({ url })
  }

  return (
    <ThemeUiButton
      onClick={gotoLink}
      variant="rectangle"
      bg={bg}
      color={color}
      data-testid={dataTestId}
    >
      <Flex
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Text
          color={color}
          sx={{
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {text}
        </Text>
        <Flex>
          <Flex
            color={color}
            sx={{
              fontSize: '12px',
              alignItems: 'center',
              opacity: 0.5,
            }}
          >
            {subtext}
          </Flex>
          <Flex
            ml="8px"
            sx={{
              alignItems: 'center',
            }}
          >
            <ExternalLinkSvg color={color} fill={color} opacity={0.25} />
          </Flex>
        </Flex>
      </Flex>
    </ThemeUiButton>
  )
}

export default Button
