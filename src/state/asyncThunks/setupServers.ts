import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetchServerList } from '../slices/servers'
import { AppDispatch, RootState } from '../store'

export const setupServers = createAsyncThunk<
  void, // Return type of the payload creator
  undefined, // argument to the payload creator
  {
    dispatch: AppDispatch
    state: RootState
  }
>('flow/setupServers', async (_, { getState, dispatch }) => {
  try {
    let store = getState()
    let serversListLoading = store.servers.loading
    const { loc_hash, is_premium } = store.session
    if (loc_hash && serversListLoading === 'idle') {
      await dispatch(
        fetchServerList({
          locHash: loc_hash,
          isPro: is_premium,
        }),
      )
    }
    store = getState()
    serversListLoading = store.servers.loading
    console.log('%c serversListLoading ', 'background: #383E49; color: #1ADEAE', serversListLoading)
    if (serversListLoading === 'fulfilled') {
      // DOESN'T WORK YET. fetchServerList promise resolves with serversListLoading === 'pending'
      console.log('%c getAutopilot ', 'background: #383E49; color: #1ADEAE', serversListLoading)
      // const autopilot = await getAutopilot(data.session_auth_hash, serversList)
      // if (autopilot) {
      //   dispatch(setAutopilot(autopilot))
      //   dispatch(setCurrentLocation(autopilot.location))
      //   dispatch(setCurrentDataCenter(autopilot.dataCenter))
      //   connectProxy(autopilot.dataCenter.hosts[0].hostname)
      //   dispatch(setIsConnected(true))
      // }
    }
  } catch (err) {
    console.log('Error while trying to login: ', err)
  }
})
