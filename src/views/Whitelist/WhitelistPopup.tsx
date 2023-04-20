import { useState, useEffect, useCallback } from 'react'
import { Box, Input, Text } from 'theme-ui'
import isValidDomain from 'is-valid-domain'

import { Subheader, Popup, RoundedBox, ToggleSwitch, ListItem } from 'components'
import type { ThemeUiElement, InputChangeHandler } from 'utils/types'
import ButtonsGroup, { type SubmitButtonMode } from './ButtonsGroup'
import SettingsOption from './SettingsOption'
import ExternalLinkButton from './ExternalLinkButton'
import { useDispatchAlias, useSelector } from 'state/hooks'
import { ADD_TO_WHITELIST, REMOVE_FROM_WHITELIST } from 'state/slices/whitelist'

type WhitelistPopupProps = {
  domain: string
  isOpen: boolean
  isEditMode: boolean
  closePopup: () => void
}

const WhitelistPopup: ThemeUiElement<WhitelistPopupProps> = ({
  domain,
  isOpen = false,
  isEditMode = false,
  closePopup,
}) => {
  const dispatchAlias = useDispatchAlias()
  const whitelist = useSelector(s => s.whitelist)

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
    const settings = whitelist[domain]

    const allowAds = settings?.allowAds || false
    const allowPrivacyFeatures = settings?.allowPrivacyFeatures || false
    const allowDirectConnections = settings?.allowDirectConnections || false
    const includeAllSubdomains = settings?.includeAllSubdomains || false

    setIsAdsAllowed(allowAds)
    setIsPrivacyFeaturesAllowed(allowPrivacyFeatures)
    setIsDirectConnectionsAllowed(allowDirectConnections)
    setIsAllSubdomainsIncluded(includeAllSubdomains)
  }, [whitelist, domain])

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
      await dispatchAlias(REMOVE_FROM_WHITELIST, { domain: domainValue })
      return
    }

    const isValid = checkIfDomainValid(domainValue)
    if (!isValid) return

    await dispatchAlias(ADD_TO_WHITELIST, {
      domain: domainValue,
      allowAds: isAdsAllowed,
      allowPrivacyFeatures: isPrivacyFeaturesAllowed,
      allowDirectConnections: isDirectConnectionsAllowed,
      includeAllSubdomains: isAllSubdomainsIncluded,
    })

    closePopup()
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
    <Popup isOpen={isOpen}>
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
            placeholder={'Enter domain to whitelist'}
            value={domainValue}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
        <Box mt="24px">
          <RoundedBox>
            <ListItem>
              <Text sx={{ fontWeight: 'bold' }}>Apply to all subdomains</Text>
              <ToggleSwitch
                onChange={e => setIsAllSubdomainsIncluded(e.target.checked)}
                checked={isAllSubdomainsIncluded}
              />
            </ListItem>
            <SettingsOption
              isChecked={isDirectConnectionsAllowed}
              toggleState={setIsDirectConnectionsAllowed}
            >
              Allow Connection
            </SettingsOption>
            <SettingsOption isChecked={isAdsAllowed} toggleState={setIsAdsAllowed}>
              Allow Ads
            </SettingsOption>
            <SettingsOption
              isChecked={isPrivacyFeaturesAllowed}
              noBorder
              toggleState={setIsPrivacyFeaturesAllowed}
            >
              Allow Privacy Features
            </SettingsOption>
          </RoundedBox>
        </Box>
        <ButtonsGroup {...{ handleCancel, handleSubmit, submitButtonMode }} />
      </Box>
    </Popup>
  )
}

export default WhitelistPopup
