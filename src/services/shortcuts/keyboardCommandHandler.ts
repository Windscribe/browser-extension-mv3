import { pushToDebugLog } from 'services/debugLog'
import { setLocationTab } from 'state/slices/locationTab'
import { setOpenedByShortcut } from 'state/slices/openedByShortcut'
import { setStatus } from 'state/slices/proxy'
import { setView } from 'state/slices/view'
import { StoreType } from 'state/store'
import { throttle } from 'lodash'
import { connect, disconnect, connectToAutopilot } from 'services/proxyConfig'
import { SHORTCUT_COMMAND_THROTTLE_MS } from 'utils/constants'

// Separate throttled function just for proxy toggle
const throttledProxyToggle = throttle(async (store: StoreType): Promise<void> => {
  try {
    const state = store.getState()
    const dispatch = store.dispatch

    if (state.proxy.status === 'on' || state.proxy.status === 'connecting') {
      dispatch(setStatus('disconnecting'))
      await disconnect(store.getState, store.dispatch)
    } else if (state.proxy.status === 'off') {
      const hosts = state.currentDataCenter?.hosts
      const autopilotSelected = state.autopilot.autopilotSelected
      if (!autopilotSelected && hosts) {
        await connect(store.getState, store.dispatch, hosts)
      } else {
        await connectToAutopilot(store.getState, store.dispatch)
      }
    }
  } catch (error) {
    await pushToDebugLog({
      message: `Failed to toggle proxy: ${(error as Error)?.message ?? 'Unknown error'}`,
    })
  }
}, SHORTCUT_COMMAND_THROTTLE_MS)

async function handleKeyboardCommandImpl(
  command: string,
  bgStore: Promise<StoreType>,
): Promise<void> {
  const store = await bgStore
  const state = store.getState()
  const dispatch = store.dispatch
  const currentView = state.view.current
  const currentLocationTab = state.locationTab.currentTab
  const lastFocusedWindow = await chrome.windows.getLastFocused({
    windowTypes: ['normal'],
  })

  // Check if user is logged in
  const isLoggedIn = !!state.session?.sessionData?.session_auth_hash
  if (!isLoggedIn) {
    await pushToDebugLog({
      message: `User not logged in - skipped shortcut command ${command}`,
    })
    return
  }

  dispatch(setOpenedByShortcut(true))

  await pushToDebugLog({
    message: `Executing shortcut command ${command}`,
  })

  switch (command) {
    case 'toggle-proxy':
      await throttledProxyToggle(store)
      break

    case 'open-locations':
      try {
        if (currentView !== 'Locations' || currentLocationTab !== 'locations') {
          dispatch(setView('Locations'))
          dispatch(setLocationTab('locations'))
        }
        if (lastFocusedWindow.id) {
          await chrome.windows.update(lastFocusedWindow.id, { focused: true })
          await chrome.action.openPopup({
            windowId: lastFocusedWindow.id,
          })
          await pushToDebugLog({
            message: `Opened popup in window ${lastFocusedWindow.id}`,
          })
        }
      } catch (error) {
        await pushToDebugLog({
          level: 'WARN',
          message: `Failed to open popup: ${(error as Error)?.message ?? 'Unknown error'}`,
        })
      } finally {
        dispatch(setOpenedByShortcut(false))
      }
      break

    case 'open-favourites':
      try {
        if (currentView !== 'Locations' || currentLocationTab !== 'favorites') {
          dispatch(setView('Locations'))
          dispatch(setLocationTab('favorites'))
        }
        if (lastFocusedWindow.id) {
          await chrome.windows.update(lastFocusedWindow.id, { focused: true })
          await chrome.action.openPopup({
            windowId: lastFocusedWindow.id,
          })
          await pushToDebugLog({
            message: `Opened popup in window ${lastFocusedWindow.id}`,
          })
        }
      } catch (error) {
        await pushToDebugLog({
          level: 'WARN',
          message: `Failed to open popup: ${(error as Error)?.message ?? 'Unknown error'}`,
        })
      } finally {
        dispatch(setOpenedByShortcut(false))
      }
      break

    case 'open-preferences':
      try {
        if (currentView !== 'Preferences') {
          dispatch(setView('Preferences'))
        }
        if (lastFocusedWindow.id) {
          await chrome.windows.update(lastFocusedWindow.id, { focused: true })
          await chrome.action.openPopup({
            windowId: lastFocusedWindow.id,
          })
          await pushToDebugLog({
            message: `Opened popup in window ${lastFocusedWindow.id}`,
          })
        }
      } catch (error) {
        await pushToDebugLog({
          level: 'WARN',
          message: `Failed to open popup: ${(error as Error)?.message ?? 'Unknown error'}`,
        })
      } finally {
        dispatch(setOpenedByShortcut(false))
      }
      break
  }
}

export function handleKeyboardCommand(bgStore: Promise<StoreType>) {
  return async (command: string): Promise<void> => {
    await handleKeyboardCommandImpl(command, bgStore)
  }
}
