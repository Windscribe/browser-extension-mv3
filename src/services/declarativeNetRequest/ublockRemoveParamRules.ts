import { pushToDebugLog } from 'services/debugLog'
import { updateStaticRules } from 'services/declarativeNetRequest/updateStaticRules'

type UblockRemoveParamRuleIds = Record<string, number[]>

function getUblockRemoveParamUpdates(shouldDisable: boolean) {
  return Object.entries(UBLOCK_REMOVE_PARAM_RULE_IDS as UblockRemoveParamRuleIds)
    .filter(([, ruleIds]) => ruleIds.length > 0)
    .map(([rulesetId, ruleIds]) =>
      shouldDisable
        ? { rulesetId, disableRuleIds: ruleIds }
        : { rulesetId, enableRuleIds: ruleIds },
    )
}

export async function disableUblockRemoveParamRules(): Promise<void> {
  const rulesetUpdates = getUblockRemoveParamUpdates(true)

  await pushToDebugLog({
    message: 'Disabling uBlock removeParams rules while Link Sanitizer is on',
    tag: 'background',
    data: { rulesets: rulesetUpdates.length },
  })

  await updateStaticRules(rulesetUpdates)
}

export async function restoreUblockRemoveParamRules(): Promise<void> {
  const rulesetUpdates = getUblockRemoveParamUpdates(false)

  await pushToDebugLog({
    message: 'Restoring uBlock removeParams rules while Link Sanitizer is off',
    tag: 'background',
    data: { rulesets: rulesetUpdates.length },
  })

  await updateStaticRules(rulesetUpdates)
}
