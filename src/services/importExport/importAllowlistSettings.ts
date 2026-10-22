import { AddToAllowlistType } from 'components/hooks/useManageAllowlist'
import isValidDomain from 'is-valid-domain'
import {
  spoofUserAgentHeader,
  syncUrlCleanerWithAllowlist,
} from 'services/declarativeNetRequest/updateDynamicRules'
import {
  isTrackerRuleOverrideDomain,
  rulesetsContainingTrackerRules,
  updateStaticRules,
} from 'services/declarativeNetRequest/updateStaticRules'
import { addToExcludeScriptMatches, ALLOWLIST_DOMAIN_TABLE } from 'utils/allowListDependants'
import { getPrivacyFeatureEnabledDomains, updateAddExcludeDomains } from 'utils/networkSpoofing'
import { ImportedSettingsV1 } from 'utils/validators'
import type { LinkSanitizerState } from 'state/slices/linkSanitizer'

export const importAllowListSettings = async (
  importedSettings: ImportedSettingsV1,
  addToAllowlist: AddToAllowlistType,
  isSplitPersonalityEnabled: boolean,
  spoofedUserAgent: string,
  isUrlCleanerEnabled: boolean,
  linkSanitizer: LinkSanitizerState,
): Promise<void> => {
  if (importedSettings.allowlist !== undefined && importedSettings.allowlist !== null) {
    const toAdd = []
    const toExcludeFromSpoofing = []

    for (const [domainValue, domainWithSettings] of Object.entries(importedSettings.allowlist)) {
      const isValid = isValidDomain(domainValue)

      if (!isValid) continue

      const isAddedByDomainValid =
        domainWithSettings.addedBy &&
        ALLOWLIST_DOMAIN_TABLE[domainWithSettings.addedBy as keyof typeof ALLOWLIST_DOMAIN_TABLE]

      // only check if addedBy is valid if it's present
      if (domainWithSettings.addedBy && !isAddedByDomainValid) continue

      const level = domainWithSettings.allowAds ? 0 : 3
      toAdd.push({
        hostname: domainValue,
        level,
        domainWithSettings: {
          ...domainWithSettings,
          domain: domainValue,
        },
      })

      await addToExcludeScriptMatches(
        domainValue,
        domainWithSettings.allowPrivacyFeatures,
        domainWithSettings.includeAllSubdomains,
      )

      const excludeUrls = updateAddExcludeDomains({
        allowlist: importedSettings.allowlist,
        isSplitPersonalityEnabled:
          // use imported or current settings
          importedSettings.splitPersonalityEnabled ?? isSplitPersonalityEnabled,
        isPrivacyFeaturesAllowed: domainWithSettings.allowPrivacyFeatures,
        domainValue,
      })

      if (excludeUrls) {
        toExcludeFromSpoofing.push(...excludeUrls)
      }
    }

    if (isSplitPersonalityEnabled) {
      await spoofUserAgentHeader(spoofedUserAgent, Array.from(new Set(toExcludeFromSpoofing)))
    }

    const urlCleanerEnabled = importedSettings.urlCleanerEnabled ?? isUrlCleanerEnabled
    if (urlCleanerEnabled) {
      await syncUrlCleanerWithAllowlist(
        true,
        getPrivacyFeatureEnabledDomains(importedSettings.allowlist),
        {
          enabledGroups: importedSettings.linkSanitizerEnabledGroups,
          customParams: importedSettings.linkSanitizerCustomParams ?? linkSanitizer.customParams,
        },
      )
    }

    await addToAllowlist(toAdd)

    const shouldDisableTrackerRules = toAdd.some(
      item =>
        isTrackerRuleOverrideDomain(item.hostname) && item.domainWithSettings.allowAds === true,
    )

    if (shouldDisableTrackerRules) {
      await updateStaticRules(
        rulesetsContainingTrackerRules.map(ruleset => ({
          rulesetId: ruleset.rulesetId,
          disableRuleIds: ruleset.ruleIds,
        })),
      )
    }
  }
}
