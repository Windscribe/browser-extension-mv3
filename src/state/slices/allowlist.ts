import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { connect } from 'services/proxyConfig'

interface AllowlistItemSettings {
  allowAds: boolean
  allowPrivacyFeatures: boolean
  allowDirectConnections: boolean
  includeAllSubdomains: boolean
}

type AllowlistState = {
  [key in string]: AllowlistItemSettings
}

const initialState: AllowlistState = {}

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
  async (domainWithSettings: AllowlistPayload, { dispatch, getState }) => {
    dispatch(addDomain(domainWithSettings))
    const { hosts, status } = getState().proxy

    if (hosts && status === 'on') await connect(getState, dispatch, hosts)
  },
)

// DO NOT USE this slice directly.
// Because we also need to update ublock filter.
// Use 'components/hooks/useManageAllowlist' instead.
export const removeFromAllowlist = createAsyncThunk(
  REMOVE_FROM_ALLOWLIST,
  async (domain: string, { dispatch, getState }) => {
    await dispatch(removeDomain(domain))
    const { hosts, status } = getState().proxy
    if (hosts && status === 'on') await connect(getState, dispatch, hosts)
  },
)

export const allowlistSlice = createSlice({
  name: 'allowlist',
  initialState,
  reducers: {
    addDomain(state, action: PayloadAction<AllowlistPayload>) {
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

export const { addDomain, removeDomain } = allowlistSlice.actions
export default allowlistSlice.reducer
