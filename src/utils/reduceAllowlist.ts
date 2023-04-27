import type { RootState } from 'state/store'

// More examples are here
// https://chromium.googlesource.com/chromium/src/+/HEAD/net/docs/proxy.md#Proxy-bypass-rules
export const reduceAllowlist = (state: RootState): string[] => {
  return Object.keys(state.allowlist).reduce<string[]>((accumulator, domain) => {
    const { allowDirectConnections, includeAllSubdomains } = state.allowlist[domain]
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
