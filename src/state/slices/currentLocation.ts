import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type ServerGroup } from 'api/types'

interface CurrentLocationState extends Omit<ServerGroup, 'id' | 'pro' | 'health'> {
  id: ServerGroup['id'] | null
  pro: ServerGroup['pro'] | null
  health: ServerGroup['health'] | null
}

const initialState: CurrentLocationState = {
  id: null,
  city: '',
  nick: '',
  pro: null,
  gps: '',
  tz: '',
  wg_pubkey: '',
  link_speed: '',
  health: null,
  hosts: [],
}

export const currentLocationSlice = createSlice({
  name: 'currentLocation',
  initialState,
  reducers: {
    set(_, action: PayloadAction<CurrentLocationState>) {
      return action.payload
    },
    setId(state, action: PayloadAction<number>) {
      state.id = action.payload
    },
  },
})

export const { set, setId } = currentLocationSlice.actions
export default currentLocationSlice.reducer
