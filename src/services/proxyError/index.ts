import { setCurrentDataCenter } from 'state/slices/currentDataCenter'
import { setReconnectionAttempts } from 'state/slices/connection'
import { connectToAutopilot } from 'state/slices/autopilot'
import {
  connectProxy,
  disconnectProxy,
  setIsConnected,
  setIsPending,
  setErrorChecking,
} from 'state/slices/proxy'
import type { AppDispatch } from 'state/store'
import browserApi from 'services/browserApi'

/* TODO
This is not the best solution, but it works for now. setErrorChecking() is kind of a hack to stop this function from running simultaneously. 
*/
const proxyError = async (dispatch: AppDispatch): Promise<void> => {
  dispatch(setErrorChecking(true))
  const state = await browserApi.getStateFromStorage()

  const { smokeWall, failover, reconnectionAttempts } = state[1].connection

  const RECONNECTION_ATTEMPTS_LIMIT = 3

  if (reconnectionAttempts < RECONNECTION_ATTEMPTS_LIMIT) {
    dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
    const currentHosts = state[1].currentDataCenter?.hosts
    if (currentHosts) {
      await dispatch(connectProxy(currentHosts))
      dispatch(setErrorChecking(false))
      return
    }
  } else if (reconnectionAttempts === RECONNECTION_ATTEMPTS_LIMIT) {
    if (failover === 'Auto / Best') {
      dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
      await dispatch(connectToAutopilot())
      dispatch(setErrorChecking(false))

      return
    } else if (failover === 'Same Country') {
      const currentLocation = state[1].currentLocation
      const currentDataCenter = state[1].currentDataCenter

      const newDatacenter = currentLocation.groups?.find(
        dataCenter => dataCenter.id !== currentDataCenter.id,
      )

      if (newDatacenter) {
        dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
        dispatch(setCurrentDataCenter(newDatacenter))
        await dispatch(connectProxy(newDatacenter.hosts))
        dispatch(setErrorChecking(false))

        return
      }
    }
  }

  dispatch(setReconnectionAttempts(0))

  if (smokeWall) {
    dispatch(setIsPending(false))
    dispatch(setIsConnected(true))
  } else if (!smokeWall) {
    dispatch(disconnectProxy())
  }

  dispatch(setErrorChecking(false))
}

export default proxyError
