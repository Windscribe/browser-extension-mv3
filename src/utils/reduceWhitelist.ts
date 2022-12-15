import type { RootState } from 'state/store'

// More examples are here
// https://chromium.googlesource.com/chromium/src/+/HEAD/net/docs/proxy.md#Proxy-bypass-rules
export const reduceWhitelist = (state: RootState): string[] => {
  return Object.keys(state.whitelist).reduce<string[]>((accumulator, domain) => {
    const { allowDirectConnections, includeAllSubdomains } = state.whitelist[domain]
    if (allowDirectConnections) {
      accumulator.push(`*://${domain}/*`, `*://${domain}(:[0-9]*)?/*`)
      if (includeAllSubdomains) {
        const subdomain = domain.replace('www.', '')
        accumulator.push(`*.${subdomain}/*`, `*.${subdomain}(:[0-9]*)?/*`)
      }
    }
    return accumulator
  }, [])
}
