import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Country, DataCenter, CurrentDataCenter } from 'api/types'

export type ServersState = {
  countries: { [key in Country['id']]: Country }
  dataCenters: { [key in DataCenter['id']]: DataCenter }
  currentDataCenter: CurrentDataCenter | null
}

const initialState: ServersState = {
  countries: {},
  dataCenters: {},
  currentDataCenter: null,
}

export const serversSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {
    // TODO test this action
    setServers(state, action: PayloadAction<Omit<ServersState, 'currentDataCenter'>>) {
      return { ...state, ...action.payload }
    },
    setCurrentDataCenterById(state, action: PayloadAction<number>) {
      const id = action.payload
      const countriesArray = Object.values(state.countries)
      const country = countriesArray.find(country => country.dataCentersIds.includes(id))
      const countryCode = country?.country_code || 'AUTO'
      state.currentDataCenter = { ...state.dataCenters[id], ...{ countryCode } }
    },
  },
})

export const { setServers, setCurrentDataCenterById } = serversSlice.actions
export default serversSlice.reducer
