import { Button } from 'theme-ui'

import type { ThemeUiElement } from 'utils/types'
import { RoundedBox } from 'components'
import LinkIcon from 'assets/img/link.svg'

type ExternalLinkButtonProps = {
  url: string
}

const ExternalLinkButton: ThemeUiElement<ExternalLinkButtonProps> = ({ url }) => {
  const gotoLink = async () => {
    await chrome.tabs.create({ url: `http://${url}` })
  }

  return (
    <RoundedBox pr="16px">
      <Button
        onClick={gotoLink}
        variant="simple"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '48px',
          color: 'primaryText',
          fontSize: '14px',
          fontWeight: 'bold',
          'svg > path': {
            transition: '0.3s',
          },
          '&:hover > svg > path': {
            fill: 'primaryText',
          },
        }}
      >
        {url}
        <LinkIcon sx={{ fill: 'secondaryText' }} />
      </Button>
    </RoundedBox>
  )
}

export default ExternalLinkButton
