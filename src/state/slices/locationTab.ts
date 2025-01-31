import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Tab } from 'views/Locations/types'

type LocationTab = Tab

interface LocationTabState {
  currentTab: LocationTab
}

const initialState: LocationTabState = {
  currentTab: 'locations',
}

const locationTabSlice = createSlice({
  name: 'locationTab',
  initialState,
  reducers: {
    setLocationTab: (state, action: PayloadAction<LocationTab>) => {
      state.currentTab = action.payload
    },
  },
})

export const { setLocationTab } = locationTabSlice.actions
export default locationTabSlice.reducer
