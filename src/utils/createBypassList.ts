import type { RootState } from 'state/store'

export const createBypassList = (state: RootState): string[] => {
  const whitelist = state.whitelist
  return Object.keys(whitelist).flatMap(domain =>
    whitelist[domain]?.allowDirectConnections
      ? addToBypassList(domain, whitelist[domain].includeAllSubdomains)
      : [],
  )
}

// More examples are here https://chromium.googlesource.com/chromium/src/+/HEAD/net/docs/proxy.md#Proxy-bypass-rules
function addToBypassList(domain: string, includeAllSubdomains: boolean) {
  return includeAllSubdomains
    ? [`*.${domain}`, domain, `*://${domain}(:[0-9]*)?/*`, `*.${domain}(:[0-9]*)?/*`]
    : [domain, `*://${domain}(:[0-9]*)?/*`]
}
