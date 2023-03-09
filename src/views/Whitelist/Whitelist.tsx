import { useState } from 'react'
import { Box, Flex } from 'theme-ui'

import { Header, CircleButton, Rectangle, IconButton, Subheader, ScrollableBox } from 'components'
import { Column } from 'components/Flexbox'
import { useCurrentTabHostname } from 'components/hooks'
import WhitelistPopup from './WhitelistPopup'
import Hostname from './Hostname'
import { type ThemeUiElement } from 'utils/types'
import { REMOVE_FROM_WHITELIST } from 'state/slices/whitelist'
import { useDispatchAlias, useSelector } from 'state/hooks'

import PlusIcon from 'assets/img/plus-icon.svg'
import EditIcon from 'assets/img/editIcon.svg'
import GarbageIcon from 'assets/img/garbageIcon.svg'

const Whitelist: ThemeUiElement = () => {
  const dispatchAlias = useDispatchAlias()
  const whitelist = useSelector(s => s.whitelist)
  const whitelistedDomains = Object.keys(whitelist)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [domainToEdit, setDomainToEdit] = useState<string>('')
  const [isEditMode, setIsEditMode] = useState(false)

  const currentTabHostname = useCurrentTabHostname()

  const openSettingsFor = (candidate: string): void => {
    setDomainToEdit(candidate)
    setIsPopupOpen(true)
  }

  const openSettingsToUpdate = (candidate: string): void => {
    setIsEditMode(true)
    openSettingsFor(candidate)
  }

  const closePopup = () => {
    setIsEditMode(false)
    setIsPopupOpen(false)
  }

  return (
    <Column data-testid="whitelist-page" bg="background">
      <Header title="Whitelist">
        <CircleButton
          Icon={PlusIcon}
          onClick={() => openSettingsFor('')}
          sx={{
            backgroundColor: 'lakeBlue',
            svg: {
              fill: 'white',
            },
          }}
        />
      </Header>
      <Box
        sx={{
          height: 'auto',
          maxHeight: '336px',
        }}
      >
        <Box sx={{ mt: '8px', mx: '16px' }}>
          <Subheader>current page</Subheader>
          <Rectangle>
            <Hostname>{currentTabHostname}</Hostname>
            <IconButton
              onClick={() => openSettingsFor(currentTabHostname)}
              sx={{ p: 0, ml: '16px' }}
            >
              <PlusIcon />
            </IconButton>
          </Rectangle>
        </Box>
        <ScrollableBox sx={{ mt: '20px', height: '236px' }}>
          <Subheader>whitelisted</Subheader>
          {whitelistedDomains.map(domain => (
            <Rectangle key={domain} sx={{ mb: '12px' }}>
              <Hostname>{domain}</Hostname>
              <Flex sx={{ flexShrink: 0 }}>
                <IconButton onClick={() => openSettingsToUpdate(domain)} sx={{ p: 0, ml: '16px' }}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={async () => await dispatchAlias(REMOVE_FROM_WHITELIST, { domain })}
                  sx={{ p: 0, ml: '16px' }}
                >
                  <GarbageIcon />
                </IconButton>
              </Flex>
            </Rectangle>
          ))}
        </ScrollableBox>
      </Box>
      <WhitelistPopup
        domain={domainToEdit}
        isOpen={isPopupOpen}
        isEditMode={isEditMode}
        closePopup={closePopup}
      />
    </Column>
  )
}

export default Whitelist
