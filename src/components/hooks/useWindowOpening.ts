import { getWebSession } from 'api/endpoints'
import { ENVS } from 'utils/constants'
import { useDispatch, useSelector } from 'state/hooks'
import { pushToDebugLog } from 'services/debugLog'
export default (): { openWindowUsingTempSession: (route: string) => Promise<void> } => {
  const dispatch = useDispatch()

  const sessionAuthHash = useSelector(state => state.session.sessionData?.session_auth_hash)

  const openWindowUsingTempSession = async (route: string) => {
    if (sessionAuthHash) {
      const response = await getWebSession(dispatch, sessionAuthHash)
      const tempSession = response?.data?.temp_session
      if (tempSession) window.open(`${ENVS.ROOT_URL}/${route}?temp_session=${tempSession}`)
    } else {
      pushToDebugLog({
        message:
          'Failed trying to fetch temp_session token, because session_auth_hash was not exist',
        level: 'ERROR',
      })
    }
  }

  return { openWindowUsingTempSession }
}
