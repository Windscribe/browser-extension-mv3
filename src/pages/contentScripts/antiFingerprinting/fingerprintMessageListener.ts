;(() => {
  window.addEventListener('windscribe-fingerprint-detected', ((event: Event) => {
    const customEvent = event as CustomEvent<{ url: string }>
    const { url } = customEvent.detail

    chrome.runtime.sendMessage({
      what: 'contentScriptLog',
      message: `Fingerprint.js activity detected at: ${url}`,
    })
  }) as EventListener)
})()
