import { createSlice, createAsyncThunk, type PayloadAction, type Dispatch } from '@reduxjs/toolkit'
import type { Host } from 'api/types'
import type { SyncThunkCreator, Status } from 'utils/types'
import { pushToDebugLog } from 'services/debugLog'
import { checkIp } from 'services'

interface ProxyState {
  status: Status
  hosts: Host[] | undefined
  currentIp: string
  errorMessage?: string
  reconnectionAttempts: number
}

const initialState: ProxyState = {
  status: 'off',
  hosts: undefined,
  currentIp: '---.---.---.---',
  errorMessage: undefined,
  reconnectionAttempts: 0,
}

export const CHECK_CURRENT_IP = 'proxy/checkCurrentIp'
export const HANDLE_PROXY_ERROR = 'proxy/handleProxyError'

export const handleConnectionError: SyncThunkCreator<string> = errorMessage => {
  const action = (dispatch: Dispatch) => {
    pushToDebugLog({ message: errorMessage, level: 'ERROR' })
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
      pushToDebugLog({
        message: 'Error while trying to check current Ip.',
        level: 'ERROR',
        data: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      })
    }
  },
)

export const proxySlice = createSlice({
  name: 'proxy',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload
    },
    setProxy(state, action: PayloadAction<Host[]>) {
      state.hosts = action.payload
      state.errorMessage = undefined
    },
    setConnectionError(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload
    },
    setCurrentIp(state, action: PayloadAction<string>) {
      state.currentIp = action.payload
    },
    setReconnectionAttempts(state, action: PayloadAction<number>) {
      state.reconnectionAttempts = action.payload
    },
  },
})

export const { setStatus, setProxy, setConnectionError, setCurrentIp, setReconnectionAttempts } =
  proxySlice.actions
export default proxySlice.reducer
