import { AllowlistState, AllowlistItemSettings } from 'state/slices/allowlist'

export const updateAddExcludeDomains = ({
  allowlist,
  isSplitPersonalityEnabled,
  isPrivacyFeaturesAllowed,
  domainValue,
}: {
  allowlist: AllowlistState
  isSplitPersonalityEnabled: boolean
  isPrivacyFeaturesAllowed: boolean
  domainValue: string
}): string[] | undefined => {
  if (isSplitPersonalityEnabled) {
    let excludeUrl = getPrivacyFeatureEnabledDomains(allowlist)

    if (isPrivacyFeaturesAllowed) {
      excludeUrl.push(domainValue)
    } else {
      excludeUrl = excludeUrl.filter(url => url !== domainValue)
    }

    return excludeUrl
  }
}

export const getPrivacyFeatureEnabledDomains = (allowlist: AllowlistState): string[] => {
  return Object.entries(allowlist)
    .filter(([_, value]) => value.allowPrivacyFeatures)
    .map(([key]) => key)
}

export const getPrivacyFeatureEnabledDomainsAfterChange = ({
  allowlist,
  toAdd = [],
  toRemove = [],
}: {
  allowlist: AllowlistState
  toAdd?: Array<{
    hostname: string
    domainWithSettings: Pick<AllowlistItemSettings, 'allowPrivacyFeatures'> &
      Partial<AllowlistItemSettings>
  }>
  toRemove?: string[]
}): string[] => {
  const nextAllowlist: AllowlistState = { ...allowlist }

  for (const hostname of toRemove) {
    delete nextAllowlist[hostname]
  }

  for (const item of toAdd) {
    const defaults: AllowlistItemSettings = {
      allowAds: false,
      allowDirectConnections: false,
      includeAllSubdomains: false,
      allowPrivacyFeatures: false,
    }

    nextAllowlist[item.hostname] = {
      ...defaults,
      ...nextAllowlist[item.hostname],
      ...item.domainWithSettings,
    }
  }

  return getPrivacyFeatureEnabledDomains(nextAllowlist)
}
