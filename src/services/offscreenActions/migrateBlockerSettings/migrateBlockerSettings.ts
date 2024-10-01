import sendMessage from 'services/runtime/sendMessage'
import getErrorMessage from 'utils/getErrorMessage'
import { LogItem } from 'utils/types'
import { serializeError } from 'serialize-error'

async function sendApplyRulesSetMessageToUblock(rulesSets: string[]): Promise<LogItem[]> {
  const logs: LogItem[] = []

  logs.push({
    level: 'INFO',
    message: 'Sending rulesSets to ublock',
    data: rulesSets,
    tag: 'offscreen',
  })

  try {
    await sendMessage({
      what: 'applyRulesets',
      from: 'popup',
      enabledRulesets: rulesSets,
    })

    logs.push({
      level: 'INFO',
      message: `Applied Rulesets`,
      tag: 'offscreen',
    })
  } catch (err) {
    const message = getErrorMessage(err)
    logs.push({
      level: 'ERROR',
      data: serializeError(err),
      message,
      tag: 'offscreen',
    })
  }

  return logs
}

export { sendApplyRulesSetMessageToUblock }
