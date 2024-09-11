import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { connect } from 'services/proxyConfig'

export interface AllowlistItemSettings {
  allowAds: boolean
  allowPrivacyFeatures: boolean
  allowDirectConnections: boolean
  includeAllSubdomains: boolean
  addedBy?: string
}

export type AllowlistState = {
  [key in string]: AllowlistItemSettings
}

export const initialState: AllowlistState = {}

export type AllowlistPayload = {
  domain: string
} & AllowlistItemSettings

export const ADD_TO_ALLOWLIST = 'allowlist/addToAllowlist'
export const REMOVE_FROM_ALLOWLIST = 'allowlist/removeFromAllowlist'

// DO NOT USE this slice directly.
// Because we also need to update ublock filter.
// Use 'components/hooks/useManageAllowlist' instead.
export const addToAllowlist = createAsyncThunk(
  ADD_TO_ALLOWLIST,
  async (domainsWithSettings: AllowlistPayload[], { dispatch, getState }) => {
    await dispatch(addDomains(domainsWithSettings))
    const { hosts, status } = getState().proxy
    if (hosts && status === 'on') await connect(getState, dispatch, hosts, true)
  },
)

// DO NOT USE this slice directly.
// Because we also need to update ublock filter.
// Use 'components/hooks/useManageAllowlist' instead.
export const removeFromAllowlist = createAsyncThunk(
  REMOVE_FROM_ALLOWLIST,
  async (domain: string[], { dispatch, getState }) => {
    await dispatch(removeDomains(domain))
    const { hosts, status } = getState().proxy
    if (hosts && status === 'on') await connect(getState, dispatch, hosts, true)
  },
)

export const allowlistSlice = createSlice({
  name: 'allowlist',
  initialState,
  reducers: {
    addDomains(state, action: PayloadAction<AllowlistPayload[]>) {
      for (const payload of action.payload) {
        const { domain, ...settings } = payload
        state[domain] = settings
      }
    },
    removeDomains(state, action: PayloadAction<string[]>) {
      const domains = action.payload
      for (const domain of domains) {
        delete state[domain]
      }
    },
  },
})

export const { addDomains, removeDomains } = allowlistSlice.actions
export default allowlistSlice.reducer
