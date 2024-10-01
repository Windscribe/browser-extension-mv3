import { pushToDebugLog } from 'services/debugLog'
import { serializeError } from 'serialize-error'

export const defaultUblockRulesetId = 'default'
// this disable rule is for matomo tracking
// find it herewindscribe/extension-mv3/ublock/rulesets/main/default.json
export const ruleIdForMatomo = [7327]

export const updateStaticRules = async ({
  disableRuleIds,
  rulesetId,
  enableRuleIds,
}: chrome.declarativeNetRequest.UpdateStaticRulesOptions): Promise<void> => {
  try {
    await chrome.declarativeNetRequest.updateStaticRules({
      disableRuleIds,
      rulesetId,
      enableRuleIds,
    })
  } catch (err) {
    await pushToDebugLog({
      message: 'Failed to update static rules',
      level: 'ERROR',
      data: serializeError(err),
    })
  }
}
