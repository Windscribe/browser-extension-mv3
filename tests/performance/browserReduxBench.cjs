// Isolated Vivaldi benchmark for the real webext-redux transport. It does not
// load a Windscribe profile or access the network. For an unpatched baseline,
// set WS_BENCH_NODE_MODULES to a separate clean install of the dependency.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { performance } = require('node:perf_hooks')
const esbuild = require('esbuild')
const puppeteer = require('puppeteer-core')

const dependencyRoot = path.resolve(process.env.WS_BENCH_NODE_MODULES || 'node_modules')
const executablePath = process.env.VIVALDI_BINARY || '/opt/vivaldi/vivaldi-bin'
const maxTabs = Number(process.env.WS_BENCH_MAX_TABS || 100)
const maxRssKiB = 6 * 1024 * 1024
const minAvailableKiB = 6 * 1024 * 1024
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'windscribe-redux-browser-bench-'))
const extension = path.join(root, 'extension')
fs.mkdirSync(extension)

const workerSource = `
  const { wrapStore } = require('@eduardoac-skimlinks/webext-redux')
  const { createStore } = require('redux')
  const originalSend = chrome.tabs.sendMessage.bind(chrome.tabs)
  globalThis.tabMessagesSent = 0
  chrome.tabs.sendMessage = (...args) => { globalThis.tabMessagesSent++; return originalSend(...args) }
  globalThis.testStore = createStore((state = { counter: 0 }, action) =>
    action.type === 'increment' ? { counter: state.counter + 1 } : state)
  wrapStore(globalThis.testStore, { portName: 'WS_BROWSER_EXTENSION_STORE' })
`
const pageSource = `
  const { Store } = require('@eduardoac-skimlinks/webext-redux')
  globalThis.testStore = new Store({ portName: 'WS_BROWSER_EXTENSION_STORE' })
`

function availableMemoryKiB() {
  const line = fs
    .readFileSync('/proc/meminfo', 'utf8')
    .split('\n')
    .find(s => s.startsWith('MemAvailable:'))
  return Number(line.match(/\d+/)[0])
}

function browserProcessStats(rootPid) {
  const processes = new Map()
  for (const pid of fs.readdirSync('/proc').filter(s => /^\d+$/.test(s))) {
    try {
      const stat = fs.readFileSync(`/proc/${pid}/stat`, 'utf8')
      const fields = stat.slice(stat.lastIndexOf(')') + 2).split(' ')
      processes.set(Number(pid), Number(fields[1]))
    } catch (_) {}
  }
  const descendants = new Set([rootPid])
  let changed = true
  while (changed) {
    changed = false
    for (const [pid, parent] of processes) {
      if (descendants.has(parent) && !descendants.has(pid)) {
        descendants.add(pid)
        changed = true
      }
    }
  }
  let rssKiB = 0
  let fdCount = 0
  for (const pid of descendants) {
    try {
      const status = fs.readFileSync(`/proc/${pid}/status`, 'utf8')
      rssKiB += Number(status.match(/^VmRSS:\s+(\d+)/m)?.[1] || 0)
      fdCount += fs.readdirSync(`/proc/${pid}/fd`).length
    } catch (_) {}
  }
  return { processes: descendants.size, rssKiB, fdCount }
}

async function main() {
  fs.writeFileSync(
    path.join(extension, 'manifest.json'),
    JSON.stringify({
      manifest_version: 3,
      name: 'Isolated Redux transport benchmark',
      version: '1.0',
      permissions: ['tabs'],
      background: { service_worker: 'worker.js' },
    }),
  )
  fs.writeFileSync(
    path.join(extension, 'client.html'),
    '<!doctype html><script src="client.js"></script>',
  )
  for (const [source, output] of [
    [workerSource, 'worker.js'],
    [pageSource, 'client.js'],
  ]) {
    await esbuild.build({
      stdin: { contents: source, resolveDir: root },
      nodePaths: [dependencyRoot],
      bundle: true,
      platform: 'browser',
      outfile: path.join(extension, output),
      logLevel: 'silent',
    })
  }

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    pipe: true,
    ignoreDefaultArgs: ['--disable-extensions'],
    // Limit renderer processes in this synthetic, offline fixture so that a
    // large tab-count test does not crowd out the user's real applications.
    args: [
      `--disable-extensions-except=${extension}`,
      `--load-extension=${extension}`,
      '--no-first-run',
      '--renderer-process-limit=8',
    ],
  })
  try {
    const workerTarget = await browser.waitForTarget(
      t => t.type() === 'service_worker' && t.url().endsWith('/worker.js'),
      { timeout: 30000 },
    )
    const worker = await workerTarget.worker()
    const extensionOrigin = `chrome-extension://${new URL(workerTarget.url()).host}`
    const page = await browser.newPage()
    await page.goto(`${extensionOrigin}/client.html`)
    await page.evaluate(() => globalThis.testStore.ready())
    assert.equal(await page.evaluate(() => globalThis.testStore.getState().counter), 0)
    const cdp = await browser.target().createCDPSession()
    const browserPid = browser.process().pid

    for (const target of [100, 500, 1000, 3000].filter(n => n <= maxTabs)) {
      let current = await worker.evaluate(async () => (await chrome.tabs.query({})).length)
      let stopped = false
      while (current < target) {
        const batch = Math.min(10, target - current)
        await worker.evaluate(async count => {
          for (let i = 0; i < count; i++) {
            const tab = await chrome.tabs.create({ url: 'about:blank', active: false })
            try {
              await chrome.tabs.discard(tab.id)
            } catch (_) {}
          }
        }, batch)
        current += batch
        const stats = browserProcessStats(browserPid)
        if (availableMemoryKiB() < minAvailableKiB || stats.rssKiB > maxRssKiB) {
          console.log(JSON.stringify({ target, stoppedForMemory: true, current, ...stats }))
          stopped = true
          break
        }
      }
      if (stopped) break

      let channels = 0
      let channelDurationMs = 0
      const onData = ({ value }) => {
        for (const event of value) {
          if (event.name === 'ServiceWorkerHost::OpenChannelToTab' && event.ph === 'X') {
            channels++
            channelDurationMs += (event.dur || 0) / 1000
          }
        }
      }
      cdp.on('Tracing.dataCollected', onData)
      let tracingComplete
      const done = new Promise(resolve => {
        tracingComplete = resolve
      })
      cdp.once('Tracing.tracingComplete', tracingComplete)
      await cdp.send('Tracing.start', {
        categories: 'toplevel,extensions,__metadata',
        transferMode: 'ReportEvents',
      })
      const before = await worker.evaluate(() => globalThis.tabMessagesSent)
      const start = performance.now()
      await worker.evaluate(() => {
        for (let i = 0; i < 3; i++) globalThis.testStore.dispatch({ type: 'increment' })
      })
      const latency = []
      const deadline = performance.now() + 4000
      while (performance.now() < deadline) {
        const t = performance.now()
        await browser.version()
        latency.push(performance.now() - t)
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      const sent = (await worker.evaluate(() => globalThis.tabMessagesSent)) - before
      const counter = await page.evaluate(() => globalThis.testStore.getState().counter)
      await cdp.send('Tracing.end')
      await done
      cdp.off('Tracing.dataCollected', onData)
      latency.sort((a, b) => a - b)
      console.log(
        JSON.stringify({
          tabCount: current,
          updates: 3,
          sent,
          channels,
          channelDurationMs: Math.round(channelDurationMs * 10) / 10,
          probeP95Ms: Math.round(latency[Math.floor((latency.length - 1) * 0.95)] * 10) / 10,
          elapsedMs: Math.round(performance.now() - start),
          counter,
          ...browserProcessStats(browserPid),
          availableKiB: availableMemoryKiB(),
        }),
      )
    }
  } finally {
    await browser.close()
    fs.rmSync(root, { recursive: true, force: true })
  }
}

main().catch(err => {
  console.error(err.stack || err)
  process.exitCode = 1
})
