import { pushToDebugLog } from 'services/debugLog'
import { serializeError } from 'serialize-error'

// search for "/matomo.js", "/piwik.js", and "/piwik.php" in ubo-lite folder to get rules ids and ruleset ids.
export const rulesetsContainingTrackerRules = [
  {
    rulesetId: 'easyprivacy',
    ruleIds: [1862, 6993],
  },
  {
    rulesetId: 'rus-1',
    ruleIds: [42, 43, 446],
  },
]

export const trackerRuleOverrideDomains = ['controld.com', 'windscribe.com', 'windscribe.net']

export const isTrackerRuleOverrideDomain = (hostname: string): boolean => {
  const normalizedHostname = hostname.toLowerCase()

  return trackerRuleOverrideDomains.some(
    domain => normalizedHostname === domain || normalizedHostname.endsWith(`.${domain}`),
  )
}


export const updateStaticRules = async (
  rulesetUpdates: Array<{
    disableRuleIds?: number[]
    rulesetId: string
    enableRuleIds?: number[]
  }>,
): Promise<void> => {
  try {
    // Process each ruleset update sequentially
    for (const update of rulesetUpdates) {
      await chrome.declarativeNetRequest.updateStaticRules({
        disableRuleIds: update.disableRuleIds,
        rulesetId: update.rulesetId,
        enableRuleIds: update.enableRuleIds,
      })
    }
  } catch (err) {
    await pushToDebugLog({
      message: 'Failed to update static rules',
      level: 'ERROR',
      data: serializeError(err),
    })
  }
}
