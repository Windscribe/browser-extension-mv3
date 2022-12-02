import { useEffect } from 'react'
import { useDispatch, useDispatchAlias, useSelector } from 'state/hooks'
import { FETCH_SERVER_LIST } from 'state/slices/servers'
import { FETCH_BEST_LOCATION } from 'state/slices/bestLocation'
import { FETCH_SERVER_CREDENTIALS } from 'state/slices/serverCredentials'
import { applyBestLocationAsAutopilot } from 'state/slices/autopilot'
import { FETCH_NOTIFICATIONS } from 'state/slices/newsfeed'

// This function could be used as a periodical data-fetcher after small refactoring
export const useInitialDataFetching: () => void = () => {
  const dispatch = useDispatch()
  const dispatchAlias = useDispatchAlias()

  const bestLocationLoading = useSelector(s => s.bestLocation.loading)
  const isPremium = useSelector(s => s.session.is_premium)
  const sessionAuthHash = useSelector(s => s.session.session_auth_hash)
  const serverListLoading = useSelector(s => s.servers.loading)
  const autopilotData = useSelector(state => state.autopilot.autopilotData)
  const newsfeedLoading = useSelector(state => state.newsfeed.loading)

  useEffect(() => {
    console.log(
      '%c useEffect FETCH_SERVER_CREDENTIALS',
      'background: #383E49; color: #1ADEAE',
      sessionAuthHash,
    )
    // TODO  Despite serverCredentials was not changed it could FETCH_SERVER_CREDENTIALS every time user navigates on Home
    // it need to be fixed
    if (sessionAuthHash) {
      dispatchAlias(FETCH_SERVER_CREDENTIALS)
    }
  }, [sessionAuthHash])

  useEffect(() => {
    if (serverListLoading === 'idle' && sessionAuthHash) {
      dispatchAlias(FETCH_SERVER_LIST)
    }
  }, [sessionAuthHash, isPremium, serverListLoading, dispatchAlias])

  useEffect(() => {
    if (newsfeedLoading === 'idle' && sessionAuthHash) {
      dispatchAlias(FETCH_NOTIFICATIONS)
    }
  }, [sessionAuthHash, isPremium, newsfeedLoading, dispatchAlias])

  useEffect(() => {
    if (bestLocationLoading === 'idle' && sessionAuthHash) {
      dispatchAlias(FETCH_BEST_LOCATION)
    }
  }, [sessionAuthHash, isPremium, bestLocationLoading, dispatchAlias])

  useEffect(() => {
    if (
      !autopilotData &&
      bestLocationLoading === 'fulfilled' &&
      serverListLoading === 'fulfilled'
    ) {
      dispatch(applyBestLocationAsAutopilot())
    }
  }, [autopilotData, bestLocationLoading, serverListLoading, dispatch])
}
