import { AddToAllowlist } from 'components/hooks/useManageAllowlist'
import isValidDomain from 'is-valid-domain'
import {
  languageWarpScriptId,
  locationWarpScriptId,
  splitPersonalityScriptId,
  timeZoneWarpScriptId,
  workerBlockScriptId,
} from 'utils/constants'
import { getScriptForId, toExcludeMatchesURL, updateScript } from 'utils/scriptController'
import { ImportedSettingsV1 } from 'utils/validators'

export const importAllowListSettings = async (
  importedSettings: ImportedSettingsV1,
  addToAllowlist: AddToAllowlist,
): Promise<void> => {
  console.log('hm,m,mmmmm', importedSettings)
  if (importedSettings.allowlist !== undefined && importedSettings.allowlist !== null) {
    for (const [domainValue, domainWithSettings] of Object.entries(importedSettings.allowlist)) {
      const isValid = isValidDomain(domainValue)

      // skip invalid domains
      if (!isValid) continue

      const level = domainWithSettings.allowAds ? 0 : 3
      await addToAllowlist({
        hostname: domainValue,
        level,
        domainWithSettings: { ...domainWithSettings, domain: domainValue },
      })

      const workerBlockScriptExcludeMatches = (await getScriptForId(workerBlockScriptId))
        ?.excludeMatches

      const splitPersonalityScriptExcludeMatches = (await getScriptForId(splitPersonalityScriptId))
        ?.excludeMatches

      const locationWarpScriptExcludeMatches = (await getScriptForId(locationWarpScriptId))
        ?.excludeMatches

      const languageWarpScriptExcludeMatches = (await getScriptForId(languageWarpScriptId))
        ?.excludeMatches

      const timeZoneWarpScriptExcludeMatches = (await getScriptForId(timeZoneWarpScriptId))
        ?.excludeMatches

      const currentExcludeURL = toExcludeMatchesURL(
        domainValue,
        !domainWithSettings.includeAllSubdomains,
      )
      const newExcludeURL = toExcludeMatchesURL(
        domainValue,
        domainWithSettings.includeAllSubdomains,
      )

      const isPrivacyFeaturesAllowed = domainWithSettings.allowPrivacyFeatures

      if (workerBlockScriptExcludeMatches) {
        const updatedExcludeMatches = workerBlockScriptExcludeMatches.filter(
          urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
        )

        if (isPrivacyFeaturesAllowed) {
          updatedExcludeMatches.push(newExcludeURL)
        }

        await updateScript({
          id: workerBlockScriptId,
          excludeMatches: updatedExcludeMatches,
        })
      }

      if (splitPersonalityScriptExcludeMatches) {
        const updatedExcludeMatches = splitPersonalityScriptExcludeMatches.filter(
          urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
        )

        if (isPrivacyFeaturesAllowed) {
          updatedExcludeMatches.push(newExcludeURL)
        }

        await updateScript({
          id: splitPersonalityScriptId,
          excludeMatches: updatedExcludeMatches,
        })
      }

      if (locationWarpScriptExcludeMatches) {
        const updatedExcludeMatches = locationWarpScriptExcludeMatches.filter(
          urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
        )

        if (isPrivacyFeaturesAllowed) {
          updatedExcludeMatches.push(newExcludeURL)
        }

        await updateScript({
          id: locationWarpScriptId,
          excludeMatches: updatedExcludeMatches,
        })
      }

      if (languageWarpScriptExcludeMatches) {
        const updatedExcludeMatches = languageWarpScriptExcludeMatches.filter(
          urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
        )

        if (isPrivacyFeaturesAllowed) {
          updatedExcludeMatches.push(newExcludeURL)
        }

        await updateScript({
          id: languageWarpScriptId,
          excludeMatches: updatedExcludeMatches,
        })
      }

      if (timeZoneWarpScriptExcludeMatches) {
        const updatedExcludeMatches = timeZoneWarpScriptExcludeMatches.filter(
          urlScheme => urlScheme !== currentExcludeURL && urlScheme !== newExcludeURL,
        )

        if (isPrivacyFeaturesAllowed) {
          updatedExcludeMatches.push(newExcludeURL)
        }
        await updateScript({
          id: timeZoneWarpScriptId,
          excludeMatches: updatedExcludeMatches,
        })
      }
    }
  }
}
