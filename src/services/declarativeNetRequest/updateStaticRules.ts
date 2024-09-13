export const defaultUblockRulesetId = 'default'
// this disable rule is for matomo tracking
// find it herewindscribe/extension-mv3/ublock/rulesets/main/default.json
export const ruleIdForMatomo = [7327]

export const updateStaticRules = async ({
  disableRuleIds,
  rulesetId,
  enableRuleIds,
}: chrome.declarativeNetRequest.UpdateStaticRulesOptions): Promise<void> => {
  await chrome.declarativeNetRequest.updateStaticRules({
    disableRuleIds,
    rulesetId,
    enableRuleIds,
  })
}
