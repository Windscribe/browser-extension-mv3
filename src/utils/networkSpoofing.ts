import { AllowlistState } from 'state/slices/allowlist'

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
    let excludeUrl = Object.entries(allowlist)
      .filter(([_, value]) => value.allowPrivacyFeatures)
      .map(([key, _]) => key)

    if (isPrivacyFeaturesAllowed) {
      excludeUrl.push(domainValue)
    } else {
      excludeUrl = excludeUrl.filter(url => url !== domainValue)
    }

    return excludeUrl
  }
}
