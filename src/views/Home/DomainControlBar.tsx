import { useState, useEffect } from 'react'
import { Flex, Text } from 'theme-ui'
import isValidDomain from 'is-valid-domain'

import { useDispatch, useSelector } from 'state/hooks'
import { addOverlay } from 'state/slices/overlay'
import DomainControlButtonGroup from './DomainControlButtonGroup'
import { useCurrentTabHostname } from 'components/hooks'
import { IconButton } from 'components'
import AllowlistOff from 'assets/img/allowlistOff.svg'
import AllowlistOn from 'assets/img/allowlistOn.svg'
import GarbageIcon from 'assets/img/garbageIcon.svg'
import ToolTip from 'components/ToolTip'
import { getLocalizedMessage } from 'utils/getLocalisedString'
import { BROWSING_DATA } from 'utils/constants'

const SiteControlBar: React.FC = () => {
  const dispatch = useDispatch()
  const allowlist = useSelector(s => s.allowlist)
  const { currentLanguage } = useSelector(s => s.currentLanguage)

  const [isDomainValid, setIsDomainValid] = useState(true)
  const [isDomainSettingsOpen, setIsDomainSettingsOpen] = useState(false)

  const currentTabHostname = useCurrentTabHostname()

  const handleClearSiteData = async () => {
    if (!isDomainValid) return

    const granted = await chrome.permissions.contains({
      permissions: [BROWSING_DATA],
    })

    dispatch(addOverlay(granted ? 'clearSiteDataConfirm' : 'clearSiteDataPermission'))
  }

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
      <Flex sx={{ alignItems: 'center', gap: '16px' }}>
        <ToolTip message={getLocalizedMessage('wsext_clear_site_data', currentLanguage)}>
          <IconButton
            data-testid="clear-site-data-button"
            disabled={!isDomainValid}
            sx={{
              p: 0,
              height: '24px',
              width: '24px',
              ...(!isDomainValid
                ? {
                    cursor: 'not-allowed',
                    '&:hover svg > path': {
                      fill: 'halfWhite',
                    },
                  }
                : {
                    '&:hover svg > path': {
                      fill: 'white',
                    },
                  }),
            }}
            onClick={handleClearSiteData}
          >
            <GarbageIcon
              sx={{
                '& > path': {
                  fill: 'halfWhite',
                },
              }}
            />
          </IconButton>
        </ToolTip>
        <ToolTip message={getLocalizedMessage('wsext_allowlist_settings', currentLanguage)}>
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
              <AllowlistOff
                sx={{
                  '& > path': {
                    transition: 'all 0.3s ease 0s',
                    fill: 'halfWhite',
                  },
                }}
              />
            )}
          </IconButton>
        </ToolTip>
      </Flex>
      <DomainControlButtonGroup
        {...{ currentTabHostname, isDomainSettingsOpen, setIsDomainSettingsOpen }}
      />
    </Flex>
  )
}
export default SiteControlBar
