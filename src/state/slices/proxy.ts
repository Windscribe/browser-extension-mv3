import { createSlice, createAsyncThunk, type PayloadAction, type Dispatch } from '@reduxjs/toolkit'
import type { Host } from 'api/types'
import { connect, disconnect } from 'services/proxyConfig'
import { reduceAllowlist } from 'utils/reduceAllowlist'
import type { SyncThunkCreator } from 'utils/types'
import { pushToDebugLog } from './debugLog'
import { setReconnectionAttempts } from './connection'
import { checkIp, createNotification } from 'services'
import { setOverlay } from 'state/slices/overlay'
import { ACCOUNT_PLAN } from 'utils/constants'

import proxyOffIcon from 'assets/img/proxyOff.png'
import proxyOnIcon from 'assets/img/proxyOn.png'

interface ProxyState {
  isConnected: boolean
  isConnecting: boolean
  isDisconnected: boolean
  isDisconnecting: boolean
  hosts: Host[] | undefined
  currentIp: string
  errorMessage?: string
  errorChecking: boolean
}

const initialState: ProxyState = {
  isConnected: false,
  isConnecting: false,
  isDisconnected: false,
  isDisconnecting: false,
  hosts: undefined,
  currentIp: '---.---.---.---',
  errorMessage: undefined,
  errorChecking: false,
}

export const CONNECT_PROXY = 'proxy/connectProxy'
export const DISCONNECT_PROXY = 'proxy/disconnectProxy'

export const connectProxy = createAsyncThunk(
  CONNECT_PROXY,
  async (hosts: Host[], { dispatch, getState }) => {
    try {
      const { traffic_max, traffic_used, is_premium } = getState().session

      if (traffic_max === undefined || traffic_used === undefined) {
        throw Error('No session info.')
      }

      if (
        !is_premium &&
        traffic_max !== ACCOUNT_PLAN.UNLIMITED &&
        traffic_max - traffic_used <= 0
      ) {
        dispatch(setOverlay({ isOpen: true, template: 'noData' }))
        throw Error('Out of data.')
      }

      const proxySetting = await new Promise(resolve => {
        chrome.proxy.settings.get({}, function (details) {
          resolve(details.levelOfControl)
        })
      })

      if (proxySetting === 'controlled_by_other_extensions') {
        dispatch(setOverlay({ isOpen: true, template: 'extensionConflict' }))
        throw Error('Proxy is controlled by another extension.')
      }

      if (!hosts || hosts?.length === 0) {
        throw Error('Error while trying to connect to proxy. No hostname was provided.')
      }

      const allowlist = reduceAllowlist(getState())
      const proxyPort = getState().proxyPort
      const autopilotSelected = getState().autopilot.autopilotSelected
      const cruiseControlList = autopilotSelected
        ? getState().autopilot.cruiseControlList
        : undefined

      await connect(hosts, allowlist, proxyPort, cruiseControlList)
      dispatch(setProxy(hosts))

      const ip = await checkIp()
      dispatch(setCurrentIp(ip))

      if (ip === '---.---.---.---') {
        throw Error('Proxy Error')
      } else {
        dispatch(setReconnectionAttempts(0))
      }

      if (getState().allowSystemNotifications) {
        const autopilotSelected = getState().autopilot.autopilotSelected
        const { city = '', nick = '' } = getState().currentDataCenter
        const locationInfo = autopilotSelected ? 'Autopilot' : `${city} ${nick}`
        createNotification({
          iconUrl: proxyOnIcon,
          message: `You are now connected to Windscribe (${locationInfo})`,
        })
      }
    } catch (err) {
      if (err instanceof Error) {
        throw Error(err.message)
      } else {
        throw Error('Unexpected error, while trying to connect to proxy.')
      }
    }
  },
)

export const disconnectProxy = createAsyncThunk(
  DISCONNECT_PROXY,
  async (_, { getState, dispatch }) => {
    await disconnect()
    const ip = await checkIp()
    dispatch(setCurrentIp(ip))
    dispatch(resetProxy())

    if (getState().allowSystemNotifications) {
      createNotification({
        iconUrl: proxyOffIcon,
        message: 'Connection to Windscribe has been terminated',
      })
    }
    dispatch(setReconnectionAttempts(0))
    await disconnect()
  },
)

export const handleConnectionError: SyncThunkCreator<string> = errorMessage => {
  const action = (dispatch: Dispatch) => {
    dispatch(pushToDebugLog({ message: errorMessage, level: 'ERROR' }))
    dispatch(setConnectionError(errorMessage))
  }
  // Add type manually to view this action in a debugLog
  action.type = 'proxy/handleConnectionError'
  return action
}

export const proxySlice = createSlice({
  name: 'proxy',
  initialState,
  reducers: {
    setProxy(state, action: PayloadAction<Host[]>) {
      state.hosts = action.payload
      state.errorMessage = undefined
    },
    resetProxy(state) {
      state.hosts = undefined
      state.isConnected = false
      state.isConnecting = false
      state.isDisconnecting = false
      state.errorMessage = undefined
      state.errorChecking = false
    },
    setIsConnecting(state, action: PayloadAction<boolean>) {
      state.isConnecting = action.payload
    },
    setConnectionError(state, action: PayloadAction<string>) {
      state.errorMessage = `Proxy connection error. ${action.payload}`
    },
    setIsConnected(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload
    },
    setCurrentIp(state, action: PayloadAction<string>) {
      state.currentIp = action.payload
    },
    setErrorChecking(state, action: PayloadAction<boolean>) {
      state.errorChecking = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(connectProxy.pending, state => {
        state.isConnected = false
        state.isConnecting = true
        state.isDisconnected = false
        state.isDisconnecting = false
      })
      .addCase(connectProxy.fulfilled, state => {
        state.isConnected = true
        state.isConnecting = false
        state.errorMessage = undefined
        state.errorChecking = false
      })
      .addCase(connectProxy.rejected, (state, action) => {
        if (action.error.message) {
          state.errorMessage = action.error.message

          if (action.error.message !== 'Proxy Error') {
            state.isConnected = false
            state.isConnecting = false
            state.errorChecking = false
          }
        }
      })
      .addCase(disconnectProxy.pending, state => {
        state.isConnected = false
        state.isConnecting = false
        state.isDisconnected = false
        state.isDisconnecting = true
      })
      .addCase(disconnectProxy.fulfilled, state => {
        state.isConnected = false
        state.isConnecting = false
        state.isDisconnected = true
        state.isDisconnecting = false
        state.errorChecking = false
      })
  },
})

export const {
  setProxy,
  resetProxy,
  setConnectionError,
  setIsConnected,
  setCurrentIp,
  setIsConnecting,
  setErrorChecking,
} = proxySlice.actions
export default proxySlice.reducer
