// // This is not a real slice.
// // This async thunk was separated from slice/proxy into stand-alone file to avoid circular dependency with slice/autopilot
// import { createAsyncThunk } from '@reduxjs/toolkit'

// import { connectToAutopilot } from './autopilot'
// import { addOverlay } from './overlay'
// import { setReconnectionAttempts } from './connection'
// import { setCurrentDataCenter } from './currentDataCenter'
// import {
//   connectProxy,
//   disconnectProxy,
//   setIsConnecting,
//   setIsConnected,
//   setErrorChecking,
// } from './proxy'

// export const handleProxyError = createAsyncThunk(
//   'handleProxyError/handleProxyError',
//   async (_, { dispatch, getState }) => {
//     const RECONNECTION_ATTEMPTS_LIMIT = 3

//     const proxy = getState().proxy
//     const errorChecking = proxy.errorChecking
//     const isConnected = proxy.isConnected
//     const isConnecting = proxy.isConnecting
//     const hasProxyError = !!proxy.errorMessage
//     const proxyFailure = isConnected && hasProxyError
//     const shouldIgnore = errorChecking || proxyFailure || !isConnecting

//     if (shouldIgnore) {
//       return
//     }

//     dispatch(setErrorChecking(true))

//     const { smokeWall, failover, reconnectionAttempts } = getState().connection
//     if (reconnectionAttempts < RECONNECTION_ATTEMPTS_LIMIT) {
//       dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
//       const currentHosts = getState().currentDataCenter?.hosts
//       if (currentHosts) {
//         await dispatch(connectProxy(currentHosts))
//         dispatch(setErrorChecking(false))
//         return
//       }
//     }
//     if (reconnectionAttempts === RECONNECTION_ATTEMPTS_LIMIT) {
//       if (failover === 'Auto / Best') {
//         dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
//         await dispatch(connectToAutopilot())
//         dispatch(setErrorChecking(false))
//         return
//       }
//       if (failover === 'Same Country') {
//         const currentLocation = getState().currentLocation
//         const currentDataCenter = getState().currentDataCenter

//         const newDatacenter = currentLocation.groups?.find(
//           dataCenter => dataCenter.id !== currentDataCenter.id,
//         )
//         if (newDatacenter) {
//           dispatch(setReconnectionAttempts(reconnectionAttempts + 1))
//           dispatch(setCurrentDataCenter(newDatacenter))
//           await dispatch(connectProxy(newDatacenter.hosts))
//           dispatch(setErrorChecking(false))
//           return
//         }
//       }
//     }

//     dispatch(setReconnectionAttempts(0))

//     if (smokeWall) {
//       dispatch(setIsConnecting(false))
//       dispatch(setIsConnected(true))
//     } else if (!smokeWall) {
//       dispatch(disconnectProxy())
//       dispatch(addOverlay('somethingWeird'))
//     }

//     dispatch(setErrorChecking(false))
//   },
// )
