import { AddToAllowlistType } from 'components/hooks/useManageAllowlist'
import isValidDomain from 'is-valid-domain'
import { spoofUserAgentHeader } from 'services/declarativeNetRequest/updateDynamicRules'
import { addToExcludeScriptMatches, ALLOWLIST_DOMAIN_TABLE } from 'utils/allowListDependants'
import { updateAddExcludeDomains } from 'utils/networkSpoofing'
import { ImportedSettingsV1 } from 'utils/validators'

export const importAllowListSettings = async (
  importedSettings: ImportedSettingsV1,
  addToAllowlist: AddToAllowlistType,
  isSplitPersonalityEnabled: boolean,
  spoofedUserAgent: string,
): Promise<void> => {
  if (importedSettings.allowlist !== undefined && importedSettings.allowlist !== null) {
    const toAdd = []
    const toExcludeFromSpoofing = []

    for (const [domainValue, domainWithSettings] of Object.entries(importedSettings.allowlist)) {
      const isValid = isValidDomain(domainValue)

      const isAddedByDomainValid =
        domainWithSettings.addedBy &&
        ALLOWLIST_DOMAIN_TABLE[domainWithSettings.addedBy as keyof typeof ALLOWLIST_DOMAIN_TABLE]

      if (!isValid) continue

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

    await addToAllowlist(toAdd)
  }
}
