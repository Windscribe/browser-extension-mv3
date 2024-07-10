import { AllowlistState } from 'state/slices/allowlist'
import { toExcludeMatchesURL } from './scriptController'

export default function transformAllowListToExcludeMatches(allowList: AllowlistState): string[] {
  const excludeMatchesFromAllowList = Object.entries(allowList)
    .filter(([, value]) => {
      return value.allowPrivacyFeatures === true
    })
    .map(([domainKey, value]) => {
      return toExcludeMatchesURL(domainKey, value.includeAllSubdomains)
    })

  return excludeMatchesFromAllowList
}
