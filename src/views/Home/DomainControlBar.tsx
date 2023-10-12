import { useState, useEffect } from 'react'
import { Flex, Text } from 'theme-ui'
import isValidDomain from 'is-valid-domain'

import { useSelector } from 'state/hooks'
import DomainControlButtonGroup from './DomainControlButtonGroup'
import { useCurrentTabHostname } from 'components/hooks'
import { IconButton } from 'components'
import AllowlistOff from 'assets/img/allowlistOff.svg'
import AllowlistOn from 'assets/img/allowlistOn.svg'
import ToolTip from 'components/ToolTip'

const SiteControlBar: React.FC = () => {
  const allowlist = useSelector(s => s.allowlist)

  const [isDomainValid, setIsDomainValid] = useState(true)
  const [isDomainSettingsOpen, setIsDomainSettingsOpen] = useState(false)

  const currentTabHostname = useCurrentTabHostname()

  useEffect(() => {
    const isValid = isValidDomain(currentTabHostname)
    setIsDomainValid(isValid)
  }, [currentTabHostname])

  return (
    <Flex
      className="joyride-element-allowlist"
      sx={{
        alignItems: 'center',
        height: '48px',
        width: '100%',
        backgroundColor: 'darkBackground',
        px: '16px',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <Text
        data-testid="current-tab-hostname"
        sx={{ fontWeight: '600', fontSize: '14px', color: 'halfWhite' }}
      >
        {currentTabHostname}
      </Text>
      <ToolTip message="Allowlist Settings">
        <IconButton
          data-testid="open-allowlist-button"
          sx={{
            p: 0,
            height: '24px',
            width: '24px',
            ...(!isDomainValid
              ? {
                  cursor: 'not-allowed',
                  '&:hover svg': {
                    fill: 'halfWhite',
                  },
                }
              : {
                  '&:hover svg > path': {
                    fill: 'white',
                  },
                }),
          }}
          disabled={!isDomainValid}
          onClick={() => setIsDomainSettingsOpen(true)}
        >
          {allowlist[currentTabHostname] ? (
            <AllowlistOn />
          ) : (
            <AllowlistOff sx={{ fill: 'halfWhite' }} />
          )}
        </IconButton>
      </ToolTip>
      <DomainControlButtonGroup
        {...{ currentTabHostname, isDomainSettingsOpen, setIsDomainSettingsOpen }}
      />
    </Flex>
  )
}
export default SiteControlBar
