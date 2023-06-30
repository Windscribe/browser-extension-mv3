import { useState, useEffect, useCallback } from 'react'
import { Box, Flex, Input, Text } from 'theme-ui'
import isValidDomain from 'is-valid-domain'

import { Subheader, Popup, RoundedBox, ToggleSwitch, ListItem } from 'components'
import type { ThemeUiElement, InputChangeHandler } from 'utils/types'
import ButtonsGroup, { type SubmitButtonMode } from './ButtonsGroup'
import SettingsOption from './SettingsOption'
import ExternalLinkButton from './ExternalLinkButton'
import { useSelector } from 'state/hooks'
import { useManageAllowlist } from 'components/hooks'

type AllowlistPopupProps = {
  domain: string
  isOpen: boolean
  isEditMode: boolean
  closePopup: () => void
}

const AllowlistPopup: ThemeUiElement<AllowlistPopupProps> = ({
  domain,
  isOpen = false,
  isEditMode = false,
  closePopup,
}) => {
  const { addToAllowlist, removeFromAllowlist } = useManageAllowlist()

  const allowlist = useSelector(s => s.allowlist)

  const [submitButtonMode, setSubmitButtonMode] = useState<SubmitButtonMode>('disabled')
  const [isDomainValid, setIsDomainValid] = useState(true)
  const [domainValue, setDomainValue] = useState(domain)
  const [isAdsAllowed, setIsAdsAllowed] = useState(false)
  const [isPrivacyFeaturesAllowed, setIsPrivacyFeaturesAllowed] = useState(false)
  const [isDirectConnectionsAllowed, setIsDirectConnectionsAllowed] = useState(false)
  const [isAllSubdomainsIncluded, setIsAllSubdomainsIncluded] = useState(false)

  const isAnyOptionAllowed = useCallback(
    () =>
      [isAdsAllowed, isPrivacyFeaturesAllowed, isDirectConnectionsAllowed].some(option => option),
    [isAdsAllowed, isPrivacyFeaturesAllowed, isDirectConnectionsAllowed],
  )

  const initializeDomainSettings = useCallback(() => {
    const settings = allowlist[domain]

    const allowAds = settings?.allowAds || false
    const allowPrivacyFeatures = settings?.allowPrivacyFeatures || false
    const allowDirectConnections = settings?.allowDirectConnections || false
    const includeAllSubdomains = settings?.includeAllSubdomains || false

    setIsAdsAllowed(allowAds)
    setIsPrivacyFeaturesAllowed(allowPrivacyFeatures)
    setIsDirectConnectionsAllowed(allowDirectConnections)
    setIsAllSubdomainsIncluded(includeAllSubdomains)
  }, [allowlist, domain])

  useEffect(() => {
    initializeDomainSettings()
    setDomainValue(domain)
  }, [domain, initializeDomainSettings])

  useEffect(() => {
    if (isEditMode) {
      isAnyOptionAllowed() ? setSubmitButtonMode('save') : setSubmitButtonMode('delete')
    } else {
      isAnyOptionAllowed() && isDomainValid
        ? setSubmitButtonMode('add')
        : setSubmitButtonMode('disabled')
    }
  }, [isEditMode, isDomainValid, isAnyOptionAllowed])

  const handleChange: InputChangeHandler = e => {
    setIsDomainValid(true)
    setDomainValue(e?.target?.value)
  }

  const handleBlur: InputChangeHandler = e => {
    checkIfDomainValid(e.target.value)
  }

  const handleSubmit = async () => {
    if (submitButtonMode === 'delete') {
      removeFromAllowlist({ hostname: domainValue, level: 3 })
      closePopup()
      return
    }

    const isValid = checkIfDomainValid(domainValue)
    if (!isValid) return

    closePopup()

    const level = isAdsAllowed ? 0 : 3
    const domainWithSettings = {
      domain: domainValue,
      allowAds: isAdsAllowed,
      allowPrivacyFeatures: isPrivacyFeaturesAllowed,
      allowDirectConnections: isDirectConnectionsAllowed,
      includeAllSubdomains: isAllSubdomainsIncluded,
    }

    await addToAllowlist({ hostname: domainValue, level, domainWithSettings })
  }

  const checkIfDomainValid = (domainValue: string) => {
    const isValid = isValidDomain(domainValue)
    setIsDomainValid(isValid)
    return isValid
  }

  const handleCancel = () => {
    setIsDomainValid(true)
    closePopup()
  }

  return (
    <Popup data-testid="allowlist-settings-popup" isOpen={isOpen}>
      <Box bg="background" py="24px" px="16px" sx={{ height: '100%' }}>
        {isDomainValid ? (
          <Subheader>{isEditMode ? 'edit' : 'add new'}</Subheader>
        ) : (
          <Subheader color="bloodRed">enter valid domain</Subheader>
        )}
        {isEditMode ? (
          <ExternalLinkButton url={domainValue} />
        ) : (
          <Input
            data-testid="allowlist-domain-input"
            placeholder={'Enter domain to allowlist'}
            value={domainValue}
            onChange={handleChange}
            onBlur={handleBlur}
            sx={{
              '::placeholder': {
                color: 'secondaryText',
              },
            }}
          />
        )}
        <Flex mt="16px" sx={{ gap: '16px', flexDirection: 'column' }}>
          <RoundedBox>
            <SettingsOption isChecked={isAdsAllowed} toggleState={setIsAdsAllowed} noBorder>
              Allow Ads
            </SettingsOption>
          </RoundedBox>
          <Box sx={{ borderRadius: '8px', border: '1px solid', borderColor: 'foreground' }}>
            <RoundedBox>
              <SettingsOption
                isChecked={isDirectConnectionsAllowed}
                toggleState={setIsDirectConnectionsAllowed}
              >
                Allow Connection
              </SettingsOption>
              <SettingsOption
                data-testid="allow-privacy-features-checkbox"
                isChecked={isPrivacyFeaturesAllowed}
                noBorder
                toggleState={setIsPrivacyFeaturesAllowed}
              >
                Allow Privacy Features
              </SettingsOption>
            </RoundedBox>
            <ListItem sx={{ color: 'secondaryText', px: '16px' }} noBorder>
              <Text sx={{ fontWeight: 'bold' }}>Apply to all subdomains</Text>
              <ToggleSwitch
                onChange={e => setIsAllSubdomainsIncluded(e.target.checked)}
                checked={isAllSubdomainsIncluded}
                bg="allowListSwitch"
              />
            </ListItem>
          </Box>
        </Flex>
        <ButtonsGroup {...{ handleCancel, handleSubmit, submitButtonMode }} />
      </Box>
    </Popup>
  )
}

export default AllowlistPopup
