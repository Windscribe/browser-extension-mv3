import { pushToDebugLog } from 'services/debugLog'
import { setLocationTab } from 'state/slices/locationTab'
import { setOpenedByShortcut } from 'state/slices/openedByShortcut'
import { setStatus } from 'state/slices/proxy'
import { setView } from 'state/slices/view'
import { StoreType } from 'state/store'
import { throttle } from 'lodash'
import { connect, disconnect, connectToAutopilot } from 'services/proxyConfig'
import { SHORTCUT_COMMAND_THROTTLE_MS } from 'utils/constants'

const throttledHandleKeyboardCommand = throttle(
  async (command: string, bgStore: Promise<StoreType>): Promise<void> => {
    const store = await bgStore
    const state = store.getState()
    const dispatch = store.dispatch

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
        break

      case 'open-locations':
        await chrome.action.openPopup()
        dispatch(setView('Locations'))
        dispatch(setLocationTab('locations'))
        dispatch(setOpenedByShortcut(false))
        break

      case 'open-favourites':
        await chrome.action.openPopup()
        dispatch(setView('Locations'))
        dispatch(setLocationTab('favorites'))
        dispatch(setOpenedByShortcut(false))
        break

      case 'open-preferences':
        await chrome.action.openPopup()
        dispatch(setView('Preferences'))
        dispatch(setOpenedByShortcut(false))
        break
    }
  },
  SHORTCUT_COMMAND_THROTTLE_MS,
)

export function handleKeyboardCommand(bgStore: Promise<StoreType>) {
  return async (command: string): Promise<void> => {
    await throttledHandleKeyboardCommand(command, bgStore)
  }
}
