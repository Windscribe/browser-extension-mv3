import { Button, Flex, Text } from 'theme-ui'
import ExternalLinkSvg from 'assets/img/externalLinkIcon.svg'

type ButtonProps = {
  bg?: string
  color?: string
  text?: string
  subtext?: string
}

export default ({ bg, color, text, subtext }: ButtonProps) => {
  return (
    <Button variant="rectangle" bg={bg} color={color}>
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
