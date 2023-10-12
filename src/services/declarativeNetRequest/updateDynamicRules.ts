const {
  MAIN_FRAME,
  SUB_FRAME,
  STYLESHEET,
  SCRIPT,
  IMAGE,
  FONT,
  OBJECT,
  XMLHTTPREQUEST,
  PING,
  CSP_REPORT,
  MEDIA,
  WEBSOCKET,
  OTHER,
} = chrome.declarativeNetRequest.ResourceType

// It's just a template of a rule. Spoofed Header value is required to make it finalized.
const spoofUserAgentHeaderRuleTemplate: chrome.declarativeNetRequest.Rule = {
  id: 1,
  priority: 1,
  condition: {
    resourceTypes: [
      MAIN_FRAME,
      SUB_FRAME,
      STYLESHEET,
      SCRIPT,
      IMAGE,
      FONT,
      OBJECT,
      XMLHTTPREQUEST,
      PING,
      CSP_REPORT,
      MEDIA,
      WEBSOCKET,
      OTHER,
    ],
    urlFilter: '*',
  },
  action: {
    type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
    requestHeaders: [
      {
        header: 'User-Agent',
        operation: chrome.declarativeNetRequest.HeaderOperation.SET,
      },
    ],
  },
}

export async function spoofUserAgentHeader(spoofedUserAgent = ''): Promise<void> {
  const rule = JSON.parse(JSON.stringify(spoofUserAgentHeaderRuleTemplate))
  rule.action.requestHeaders[0].value = spoofedUserAgent

  await chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [rule],
    removeRuleIds: [spoofUserAgentHeaderRuleTemplate.id],
  })
}

export async function resetSpoofUserAgentHeader(): Promise<void> {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [spoofUserAgentHeaderRuleTemplate.id],
  })
}
