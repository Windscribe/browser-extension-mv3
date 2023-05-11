import { useState } from 'react'
import { Box, Flex } from 'theme-ui'

import { Header, CircleButton, Rectangle, IconButton, Subheader, ScrollableBox } from 'components'
import { Column } from 'components/Flexbox'
import { useCurrentTabHostname, useManageAllowlist } from 'components/hooks'
import AllowlistPopup from './AllowlistPopup'
import Hostname from './Hostname'
import { type ThemeUiElement } from 'utils/types'
import { useSelector } from 'state/hooks'

import PlusIcon from 'assets/img/plus-icon.svg'
import EditIcon from 'assets/img/editIcon.svg'
import GarbageIcon from 'assets/img/garbageIcon.svg'

const Allowlist: ThemeUiElement = () => {
  const allowlist = useSelector(s => s.allowlist)
  const allowlistedDomains = Object.keys(allowlist)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [domainToEdit, setDomainToEdit] = useState<string>('')
  const [isEditMode, setIsEditMode] = useState(false)

  const currentTabHostname = useCurrentTabHostname()
  const { removeFromAllowlist } = useManageAllowlist()

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
    <Column data-testid="allowlist-page" bg="background">
      <Header title="Allowlist">
        <CircleButton
          data-testid="add-to-allowlist-button"
          Icon={PlusIcon}
          onClick={() => openSettingsFor('')}
          sx={{
            background: 'lakeBlue',
            transition: '0.3s',
            svg: {
              fill: 'white',
            },
            ':hover': {
              background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #006AFF',
              svg: {
                fill: 'white',
              },
            },
          }}
        />
      </Header>
      <Box
        sx={{
          height: '336px',
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
        <Subheader mt="20px" pl="16px">
          allowlisted
        </Subheader>
        <ScrollableBox data-testid="allowlist-items-list" sx={{ maxHeight: '212px' }}>
          {allowlistedDomains.map(domain => (
            <Rectangle key={domain} sx={{ mb: '12px' }}>
              <Hostname>{domain}</Hostname>
              <Flex sx={{ flexShrink: 0 }}>
                <IconButton onClick={() => openSettingsToUpdate(domain)} sx={{ p: 0, ml: '16px' }}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={async () => await removeFromAllowlist({ hostname: domain, level: 3 })}
                  sx={{ p: 0, ml: '16px' }}
                >
                  <GarbageIcon />
                </IconButton>
              </Flex>
            </Rectangle>
          ))}
        </ScrollableBox>
      </Box>
      <AllowlistPopup
        domain={domainToEdit}
        isOpen={isPopupOpen}
        isEditMode={isEditMode}
        closePopup={closePopup}
      />
    </Column>
  )
}

export default Allowlist
