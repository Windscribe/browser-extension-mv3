const path = require('path')
const { spawnSync } = require('child_process')

const root = path.resolve(__dirname, '..')
const patch = path.join(
  root,
  'patches',
  '@eduardoac-skimlinks+webext-redux+3.0.1-release-candidate.patch',
)
const packageInfo = require('@eduardoac-skimlinks/webext-redux/package.json')

if (packageInfo.version !== '3.0.1-release-candidate') {
  throw new Error(
    'Unexpected webext-redux version; review the local performance patch before upgrading it.',
  )
}

function gitApply(args) {
  const result = spawnSync('git', ['apply', ...args, patch], { cwd: root, encoding: 'utf8' })
  if (result.error) throw result.error
  return result.status === 0
}

if (gitApply(['--check'])) {
  if (!gitApply([])) throw new Error('Could not apply the webext-redux performance patch.')
  console.log('Applied the webext-redux performance patch.')
} else if (gitApply(['--reverse', '--check'])) {
  console.log('The webext-redux performance patch is already applied.')
} else {
  throw new Error('The webext-redux performance patch does not match the installed dependency.')
}

require('./verifyReduxBroadcastPatch')
