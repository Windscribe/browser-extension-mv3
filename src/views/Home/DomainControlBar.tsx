import { useState, useEffect } from 'react'
import { Flex, Text } from 'theme-ui'
import isValidDomain from 'is-valid-domain'

import { useSelector } from 'state/hooks'
import { footerHeight } from 'styles/constants'
import DomainControlButtonGroup from './DomainControlButtonGroup'
import { useCurrentTabHostname } from 'components/hooks'
import { IconButton } from 'components'
import WhitelistOff from 'assets/img/whitelistOff.svg'
import WhitelistOn from 'assets/img/whitelistOn.svg'

const SiteControlBar: React.FC = () => {
  const whitelist = useSelector(s => s.whitelist)

  const [isDomainValid, setIsDomainValid] = useState(true)
  const [isDomainSettingsOpen, setIsDomainSettingsOpen] = useState(false)

  const currentTabHostname = useCurrentTabHostname()

  useEffect(() => {
    const isValid = isValidDomain(currentTabHostname)
    setIsDomainValid(isValid)
  }, [currentTabHostname])

  return (
    <Flex
      className="joyride-element-whitelist"
      sx={{
        alignItems: 'center',
        height: `${footerHeight}`,
        width: '100%',
        backgroundColor: 'darkBackground',
        px: '16px',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <Text sx={{ fontWeight: '600', fontSize: '14px', color: 'halfWhite' }}>
        {currentTabHostname}
      </Text>
      <IconButton
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
        {whitelist[currentTabHostname] ? (
          <WhitelistOn />
        ) : (
          <WhitelistOff sx={{ fill: 'halfWhite' }} />
        )}
      </IconButton>
      <DomainControlButtonGroup
        {...{ currentTabHostname, isDomainSettingsOpen, setIsDomainSettingsOpen }}
      />
    </Flex>
  )
}
export default SiteControlBar
