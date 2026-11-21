const fs = require('fs')

// Installing with --ignore-scripts skips the local patch. Fail the production
// build instead of silently shipping the original per-tab broadcasts.
const packageInfo = require('@eduardoac-skimlinks/webext-redux/package.json')
const adapterPath = require.resolve('@eduardoac-skimlinks/webext-redux/lib/wrap-store/wrapStore.js')
const adapter = fs.readFileSync(adapterPath, 'utf8')

if (
  packageInfo.version !== '3.0.1-release-candidate' ||
  !adapter.includes('Windscribe uses proxy stores only in extension pages') ||
  adapter.includes('browserAPI.tabs.query')
) {
  throw new Error(
    'The webext-redux performance patch is missing or incompatible. Run yarn install with lifecycle scripts enabled, then yarn test:redux-sync.',
  )
}
