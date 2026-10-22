;(() => {
  // The MAIN-world fingerprintjs script lives in the same JS context as the page,
  // so any page can forge this CustomEvent. Treat the event as untrusted: we only
  // use it as a "ping" and discard any page-controlled payload. The background
  // worker derives the URL from sender.tab.url, which is browser-attested.
  const THROTTLE_MS = 5000
  let lastForwardTime = 0

  window.addEventListener('windscribe-fingerprint-detected', (() => {
    const now = Date.now()
    if (now - lastForwardTime < THROTTLE_MS) return
    lastForwardTime = now

    chrome.runtime.sendMessage({ what: 'fingerprintDetected' })
  }) as EventListener)
})()
