import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'

import { connectProxy } from './proxy'

interface WhitelistItemSettings {
  allowAds: boolean
  allowPrivacyFeatures: boolean
  allowDirectConnections: boolean
  includeAllSubdomains: boolean
}

type WhitelistState = {
  [key in string]: WhitelistItemSettings
}

const initialState: WhitelistState = {}

export type WhitelistPayload = {
  domain: string
} & WhitelistItemSettings

export const ADD_TO_WHITELIST = 'whitelist/addToWhitelist'
export const REMOVE_FROM_WHITELIST = 'whitelist/removeFromWhitelist'

export const addToWhitelist = createAsyncThunk(
  ADD_TO_WHITELIST,
  async (domainWithSettings: WhitelistPayload, { dispatch, getState }) => {
    dispatch(addDomain(domainWithSettings))
    const hosts = getState().proxy.hosts
    if (hosts) await dispatch(connectProxy(hosts))
  },
)

export const removeFromWhitelist = createAsyncThunk(
  REMOVE_FROM_WHITELIST,
  async (domain: string, { dispatch, getState }) => {
    await dispatch(removeDomain(domain))
    const hosts = getState().proxy.hosts
    if (hosts) await dispatch(connectProxy(hosts))
  },
)

export const whitelistSlice = createSlice({
  name: 'whitelist',
  initialState,
  reducers: {
    addDomain(state, action: PayloadAction<WhitelistPayload>) {
      const { domain, ...settings } = action.payload
      state[domain] = settings
      return state
    },
    removeDomain(state, action: PayloadAction<string>) {
      delete state[action.payload]
      return state
    },
  },
})

export const { addDomain, removeDomain } = whitelistSlice.actions
export default whitelistSlice.reducer
