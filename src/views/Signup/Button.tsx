import { Button, Flex, Text } from 'theme-ui'
import ExternalLinkSvg from 'assets/img/externalLinkIcon.svg'
import { type Colors } from 'styles'

type ButtonProps = {
  bg?: Colors
  color?: Colors
  text?: string
  subtext?: string
  url: string
}

export default ({ bg, color, text, subtext, url }: ButtonProps) => {
  const gotoLink = async () => {
    //TODO Implement separate, browser-agnostic service. Get rid of hardcoded url.
    await chrome.tabs.create({ url })
  }

  return (
    <Button onClick={gotoLink} variant="rectangle" bg={bg} color={color}>
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
    </Button>
  )
}
