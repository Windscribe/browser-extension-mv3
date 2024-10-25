import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type PermissionState = {
  grantedPermissions: string[]
}

export const initialState: PermissionState = {
  grantedPermissions: [],
}

export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    addPermissions(state: PermissionState, action: PayloadAction<string[]>) {
      const newPermissions = action.payload.filter(
        permission => !state.grantedPermissions.includes(permission),
      )
      state.grantedPermissions.push(...newPermissions)
    },
    removePermissions(state: PermissionState, action: PayloadAction<string[]>) {
      state.grantedPermissions = state.grantedPermissions.filter(
        permission => !action.payload.includes(permission),
      )
    },
  },
})

export const { addPermissions, removePermissions } = permissionsSlice.actions
export default permissionsSlice.reducer
