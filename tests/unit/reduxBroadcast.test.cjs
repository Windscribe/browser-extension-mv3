const assert = require('node:assert/strict')
const { afterEach, test } = require('node:test')
const { createStore } = require('redux')
const { Store, wrapStore } = require('@eduardoac-skimlinks/webext-redux')
const { createHarness } = require('../helpers/webextReduxHarness.cjs')

const portName = 'WS_BROWSER_EXTENSION_STORE'

function reducer(state = { counter: 0, privacy: true }, action) {
  if (action.type === 'increment') return { ...state, counter: state.counter + 1 }
  if (action.type === 'privacy') return { ...state, privacy: action.payload }
  return state
}

afterEach(() => {
  delete global.chrome
})

for (const tabCount of [100, 500, 1000, 3000]) {
  test(`Redux sync reaches extension pages without broadcasting to ${tabCount} tabs`, async () => {
    const harness = createHarness(tabCount)
    global.chrome = harness.worker
    const background = createStore(reducer)
    wrapStore(background, { portName })

    global.chrome = harness.page()
    const popup = new Store({ portName })
    await popup.ready()
    global.chrome = harness.page()
    const debugPage = new Store({ portName })
    await debugPage.ready()

    assert.deepEqual(popup.getState(), background.getState())
    assert.deepEqual(debugPage.getState(), background.getState())
    await popup.dispatch({ type: 'increment' })
    await popup.dispatch({ type: 'privacy', payload: false })
    assert.deepEqual(popup.getState(), { counter: 1, privacy: false })
    assert.deepEqual(debugPage.getState(), background.getState())

    // A no-op action must not produce a new state message.
    const messagesBeforeNoOp = harness.counts.runtimeBroadcasts
    background.dispatch({ type: 'noop' })
    assert.equal(harness.counts.runtimeBroadcasts, messagesBeforeNoOp)
    assert.equal(harness.counts.tabQueries, 0)
    assert.equal(harness.counts.tabMessages, 0)
  })
}

test('a restarted worker can synchronize an existing extension page and new popup', async () => {
  const harness = createHarness(3000)
  global.chrome = harness.worker
  const firstWorker = createStore(reducer)
  wrapStore(firstWorker, { portName })
  global.chrome = harness.page()
  const existingPage = new Store({ portName })
  await existingPage.ready()
  await existingPage.dispatch({ type: 'increment' })

  // The real worker is recreated from persisted state; existing extension
  // pages and their listeners remain separate browser contexts.
  const persistedState = firstWorker.getState()
  harness.restartWorker()
  global.chrome = harness.worker
  const secondWorker = createStore(reducer, persistedState)
  wrapStore(secondWorker, { portName })
  await existingPage.dispatch({ type: 'privacy', payload: false })
  assert.deepEqual(existingPage.getState(), secondWorker.getState())

  global.chrome = harness.page()
  const reopenedPopup = new Store({ portName })
  await reopenedPopup.ready()
  assert.deepEqual(reopenedPopup.getState(), { counter: 1, privacy: false })
  assert.equal(harness.counts.tabQueries, 0)
  assert.equal(harness.counts.tabMessages, 0)
})

test('unrelated tab messaging remains available', () => {
  const harness = createHarness(1)
  global.chrome = harness.worker
  wrapStore(createStore(reducer), { portName })
  harness.worker.tabs.sendMessage(1, { type: 'privacy-feature-message' }, () => {})
  assert.equal(harness.counts.tabMessages, 1)
})
