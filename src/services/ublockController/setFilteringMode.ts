type SetFilteringModeArgs = { hostname: string; level: number }

// It sends message to event listeners within ublock service worker background script.
// This function could NOT be used in background service worker execution context,
// because it simply can't send a message inside the same context
export async function setUblockFilteringMode({
  hostname,
  level,
}: SetFilteringModeArgs): Promise<void> {
  await chrome.runtime
    .sendMessage({
      what: 'setFilteringMode',
      hostname,
      level,
    })
    .catch(err => {
      throw new Error('Error while trying to send "setFilteringMode" message to ublock', {
        cause: err as Error,
      })
    })
}
