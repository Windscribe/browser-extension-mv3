const assert = require('node:assert/strict')
const { spawnSync } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { test } = require('node:test')

test('the dependency patch applies cleanly, is idempotent, and refuses mismatched files', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'windscribe-redux-install-test-'))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  for (const directory of ['scripts', 'patches', 'node_modules/@eduardoac-skimlinks']) {
    fs.mkdirSync(path.join(root, directory), { recursive: true })
  }
  for (const file of ['applyReduxBroadcastPatch.js', 'verifyReduxBroadcastPatch.js']) {
    fs.copyFileSync(path.join('scripts', file), path.join(root, 'scripts', file))
  }
  const patchName = '@eduardoac-skimlinks+webext-redux+3.0.1-release-candidate.patch'
  fs.copyFileSync(path.join('patches', patchName), path.join(root, 'patches', patchName))
  const installedPackage = path.dirname(
    require.resolve('@eduardoac-skimlinks/webext-redux/package.json'),
  )
  fs.cpSync(installedPackage, path.join(root, 'node_modules/@eduardoac-skimlinks/webext-redux'), {
    recursive: true,
  })

  function run(command, args) {
    return spawnSync(command, args, { cwd: root, encoding: 'utf8' })
  }

  // Start with a pristine package, regardless of the caller's installed copy.
  assert.equal(run('git', ['apply', '--reverse', `patches/${patchName}`]).status, 0)
  assert.notEqual(run(process.execPath, ['scripts/verifyReduxBroadcastPatch.js']).status, 0)
  assert.equal(run(process.execPath, ['scripts/applyReduxBroadcastPatch.js']).status, 0)
  assert.equal(run(process.execPath, ['scripts/applyReduxBroadcastPatch.js']).status, 0)

  const target = path.join(
    root,
    'node_modules/@eduardoac-skimlinks/webext-redux/lib/wrap-store/wrapStore.js',
  )
  fs.writeFileSync(target, 'incompatible package contents\n')
  assert.notEqual(run(process.execPath, ['scripts/applyReduxBroadcastPatch.js']).status, 0)
  assert.equal(fs.readFileSync(target, 'utf8'), 'incompatible package contents\n')
})
