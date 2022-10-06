import { setAutopilotAsCurrent } from './slices/servers'
import type { AppDispatch, GetState } from './store'

/* 
Example:
const example: ActionCreator = param => {
  return async (dispatch, getState) => {
    const hash = getState().session.session_auth_hash
    await dispatch(getEntityByParam(hash, param))
  }
} 
*/

type ActionCreator = (
  param?: string | number | object,
) => (dispatch: AppDispatch, getState: GetState) => Promise<void>

const _setAutopilotAsCurrent: ActionCreator = () => {
  return async dispatch => {
    await dispatch(setAutopilotAsCurrent())
  }
}

export default {
  'alias/servers/setAutopilotAsCurrent': _setAutopilotAsCurrent,
}
