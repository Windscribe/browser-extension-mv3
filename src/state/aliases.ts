import { setAutopilotAsCurrent } from './slices/servers'

// TODO typings instead of any's
const _setAutopilotAsCurrent: any = () => {
  return async (dispatch: any, getState: any) => {
    await dispatch(setAutopilotAsCurrent())
  }
}

export default {
  'alias/servers/setAutopilotAsCurrent': _setAutopilotAsCurrent,
}
