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
      {
        header: 'sec-ch-prefers-color-scheme',
        operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE,
      },
      {
        header: 'sec-ch-prefers-reduced-motion',
        operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE,
      },
      {
        header: 'sec-ch-ua',
        operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE,
      },
      {
        header: 'sec-ch-ua-arch',
        operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE,
      },
      {
        header: 'sec-ch-ua-full-version',
        operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE,
      },
      {
        header: 'sec-ch-ua-full-version-list',
        operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE,
      },
      {
        header: 'sec-ch-ua-mobile',
        operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE,
      },
      {
        header: 'sec-ch-ua-model',
        operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE,
      },
      {
        header: 'sec-ch-ua-platform',
        operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE,
      },
      {
        header: 'sec-ch-ua-platform-version',
        operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE,
      },
    ],
  },
}

export async function spoofUserAgentHeader(
  spoofedUserAgent = '',
  dontSpoofDomains: string[],
): Promise<void> {
  const rule = JSON.parse(JSON.stringify(spoofUserAgentHeaderRuleTemplate))
  rule.action.requestHeaders[0].value = spoofedUserAgent
  // requests initiated from these domains will not be spoofed i.e from the page
  rule.condition.excludedInitiatorDomains = dontSpoofDomains
  // requests to these domains will not be spoofed
  rule.condition.excludedRequestDomains = dontSpoofDomains
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
