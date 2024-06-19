import { AllowlistState } from 'state/slices/allowlist'
import { toExcludeMatchesURL } from './scriptController'

export default function transformAllowListToExcludeMatches(allowList: AllowlistState): string[] {
  const excludeMatchesFromAllowList = Object.entries(allowList)
    .filter(([, value]) => {
      return value.allowPrivacyFeatures === true
    })
    .map(([domainKey]) => toExcludeMatchesURL(domainKey))

  return excludeMatchesFromAllowList
}
