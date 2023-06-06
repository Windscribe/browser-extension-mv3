import { createSlice, createAsyncThunk, type PayloadAction, type Dispatch } from '@reduxjs/toolkit'
import type { Host } from 'api/types'
import { connect, disconnect } from 'services/proxyConfig'
import { reduceAllowlist } from 'utils/reduceAllowlist'
import type { SyncThunkCreator } from 'utils/types'
import { pushToDebugLog } from './debugLog'
import { checkIp, createNotification } from 'services'
import { addOverlay } from 'state/slices/overlay'
import { ACCOUNT_PLAN } from 'utils/constants'
import { applyBestLocationAsAutopilot, setAutopilotSelected } from './autopilot'
import { setCurrentLocation } from './currentLocation'
import { setCurrentDataCenter } from './currentDataCenter'
import type { AppDispatch, GetState } from 'state/store'

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
  reconnectionAttempts: number
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
  reconnectionAttempts: 0,
}

export const CONNECT_PROXY = 'proxy/connectProxy'
export const DISCONNECT_PROXY = 'proxy/disconnectProxy'
export const CHECK_CURRENT_IP = 'proxy/checkCurrentIp'
export const CONNECT_TO_AUTOPILOT = 'proxy/connectToAutopilot'
export const HANDLE_PROXY_ERROR = 'proxy/handleProxyError'

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
        dispatch(addOverlay('noData'))
        throw Error('Out of data.')
      }

      const proxySetting = await new Promise(resolve => {
        chrome.proxy.settings.get({}, function (details) {
          resolve(details.levelOfControl)
        })
      })

      if (proxySetting === 'controlled_by_other_extensions') {
        dispatch(addOverlay('extensionConflict'))
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

      const ip = await checkIp(getState().workingApi)
      dispatch(setCurrentIp(ip))
      if (ip === '---.---.---.---') {
        const isRetrying = await handleProxyError(dispatch, getState)
        if (isRetrying) {
          throw Error('Retrying Connection')
        } else {
          const smokeWall = getState().connection.smokeWall

          if (smokeWall) {
            throw Error('Smoke Wall Failover')
          } else if (!smokeWall) {
            await dispatch(disconnectProxy())
            dispatch(addOverlay('somethingWeird'))
            throw Error('Proxy Disconnection Failover')
          }
        }
      } else {
        dispatch(setReconnectionAttempts(0))

        if (getState().allowSystemNotifications) {
          const autopilotSelected = getState().autopilot.autopilotSelected
          const { city = '', nick = '' } = getState().currentDataCenter
          const locationInfo = autopilotSelected ? 'Autopilot' : `${city} ${nick}`
          createNotification({
            iconUrl: proxyOnIcon,
            message: `You are now connected to Windscribe (${locationInfo})`,
          })
        }
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
    try {
      await disconnect()
      const workingApi = getState().workingApi
      const ip = await checkIp(workingApi)
      dispatch(setCurrentIp(ip))

      if (getState().allowSystemNotifications) {
        createNotification({
          iconUrl: proxyOffIcon,
          message: 'Connection to Windscribe has been terminated',
        })
      }
    } catch (err: unknown) {
      dispatch(
        pushToDebugLog({
          message: 'Error while trying to disconnect from proxy.',
          level: 'ERROR',
          data: JSON.stringify(err, Object.getOwnPropertyNames(err)),
        }),
      )
      throw new Error('Error while trying to disconnect from proxy.')
    }
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

export const checkCurrentIp = createAsyncThunk(
  CHECK_CURRENT_IP,
  async (_, { getState, dispatch }) => {
    try {
      const workingApi = getState().workingApi
      const currentIp = await checkIp(workingApi)
      dispatch(setCurrentIp(currentIp))
    } catch (err: unknown) {
      dispatch(
        pushToDebugLog({
          message: 'Error while trying to check current Ip.',
          level: 'ERROR',
          data: JSON.stringify(err, Object.getOwnPropertyNames(err)),
        }),
      )
    }
  },
)

export const connectToAutopilot = createAsyncThunk(
  CONNECT_TO_AUTOPILOT,
  async (_, { getState, dispatch }) => {
    await dispatch(applyBestLocationAsAutopilot())

    const location = getState().autopilot.autopilotData?.location
    const dataCenter = getState().autopilot.autopilotData?.dataCenter
    if (!location || !dataCenter) throw new Error('No autopilot candidates are available')
    dispatch(setAutopilotSelected(true))

    dispatch(setCurrentLocation(location))
    dispatch(setCurrentDataCenter(dataCenter))

    const hosts = getState().currentDataCenter?.hosts
    if (!hosts) throw new Error(`No data center is being used as current`)
    await dispatch(connectProxy(hosts))
  },
)

export const handleProxyError = async (
  dispatch: AppDispatch,
  getState: GetState,
): Promise<boolean> => {
  const RECONNECTION_ATTEMPTS_LIMIT = 2

  dispatch(setErrorChecking(true))

  const failover = getState().connection.failover
  const reconnectionAttempts = getState().proxy.reconnectionAttempts
  if (reconnectionAttempts < RECONNECTION_ATTEMPTS_LIMIT) {
    dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
    const currentHosts = getState().currentDataCenter?.hosts
    if (currentHosts) {
      dispatch(connectProxy(currentHosts))
      dispatch(setErrorChecking(false))
      return true
    }
  }
  if (reconnectionAttempts === RECONNECTION_ATTEMPTS_LIMIT) {
    if (failover === 'Auto / Best') {
      dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
      dispatch(connectToAutopilot())
      dispatch(setErrorChecking(false))
      return true
    }
    if (failover === 'Same Country') {
      const currentLocation = getState().currentLocation
      const currentDataCenter = getState().currentDataCenter

      const newDatacenter = currentLocation.groups?.find(
        dataCenter => dataCenter.id !== currentDataCenter.id,
      )
      if (newDatacenter) {
        dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
        dispatch(setCurrentDataCenter(newDatacenter))
        dispatch(connectProxy(newDatacenter.hosts))
        dispatch(setErrorChecking(false))
        return true
      }
    }
  }

  return false
}

export const proxySlice = createSlice({
  name: 'proxy',
  initialState,
  reducers: {
    setProxy(state, action: PayloadAction<Host[]>) {
      state.hosts = action.payload
      state.errorMessage = undefined
    },
    setIsConnecting(state, action: PayloadAction<boolean>) {
      state.isConnecting = action.payload
    },
    setConnectionError(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload
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
    setReconnectionAttempts(state, action: PayloadAction<number>) {
      state.reconnectionAttempts = action.payload
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
        state.reconnectionAttempts = 0
        state.isConnected = true
        state.isConnecting = false
        state.errorChecking = false
      })
      .addCase(connectProxy.rejected, (state, action) => {
        if (action.error.message) {
          state.errorMessage = action.error.message

          if (action.error.message !== 'Retrying Connection') {
            state.isConnected = action.error.message === 'Smoke Wall Failover'
            state.reconnectionAttempts = 0
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
        state.hosts = undefined
        state.errorMessage = undefined
        state.reconnectionAttempts = 0
      })
      .addCase(connectToAutopilot.rejected, (state, action) => {
        state.errorMessage = `${action.error.name}. ${action.error.message}`
      })
  },
})

export const {
  setProxy,
  setConnectionError,
  setIsConnected,
  setCurrentIp,
  setIsConnecting,
  setErrorChecking,
  setReconnectionAttempts,
} = proxySlice.actions
export default proxySlice.reducer
