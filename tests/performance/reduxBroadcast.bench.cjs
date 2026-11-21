// A transport-level scaling benchmark, not a substitute for browser traces.
const { performance } = require('node:perf_hooks')
const { createStore } = require('redux')
const { wrapStore } = require('@eduardoac-skimlinks/webext-redux')
const { createHarness } = require('../helpers/webextReduxHarness.cjs')

for (const tabCount of [100, 500, 1000, 3000]) {
  const harness = createHarness(tabCount)
  global.chrome = harness.worker
  const store = createStore((state = { counter: 0 }, action) =>
    action.type === 'increment' ? { counter: state.counter + 1 } : state,
  )
  const start = performance.now()
  wrapStore(store, { portName: 'WS_BROWSER_EXTENSION_STORE' })
  for (let i = 0; i < 20; i++) store.dispatch({ type: 'increment' })
  console.log(
    JSON.stringify({
      tabCount,
      updates: 20,
      ...harness.counts,
      elapsedMs: performance.now() - start,
    }),
  )
}
