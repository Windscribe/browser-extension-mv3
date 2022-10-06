import { setAutopilotAsCurrent, SET_AUTOPILOT_AS_CURRENT } from './slices/servers'

export default {
  [`alias/${SET_AUTOPILOT_AS_CURRENT}`]: setAutopilotAsCurrent,
}
