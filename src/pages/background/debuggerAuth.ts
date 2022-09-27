import { type ServerCredentials } from 'api/types'

export default (serverCredentials: ServerCredentials): void => {
  const attachDebugger = (tabId: number) => {
    chrome.debugger.attach({ tabId: tabId }, '1.3', () => {
      if (!chrome.runtime.lastError) {
        chrome.debugger.sendCommand({ tabId: tabId }, 'Fetch.enable', {
          handleAuthRequests: true,
        })
      }
    })
  }

  chrome.tabs.onCreated.addListener(tab => {
    if (tab.id) {
      attachDebugger(tab.id)
    }
  })

  chrome.tabs.onActivated.addListener(tab => {
    attachDebugger(tab.tabId)
  })

  chrome.tabs.onUpdated.addListener(tabId => {
    attachDebugger(tabId)
  })

  chrome.debugger.onEvent.addListener(allEventHandler)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function allEventHandler(debuggeeId: any, message: string, params: any) {
    if (message === 'Fetch.requestPaused') {
      chrome.debugger.sendCommand({ tabId: debuggeeId.tabId }, 'Fetch.continueRequest', {
        requestId: params.requestId,
      })
    } else if (message === 'Fetch.authRequired') {
      chrome.debugger.sendCommand({ tabId: debuggeeId.tabId }, 'Fetch.continueWithAuth', {
        requestId: params.requestId,
        authChallengeResponse: {
          response: 'ProvideCredentials',
          username: atob(serverCredentials.username),
          password: atob(serverCredentials.password),
        },
      })
    }
  }
}
