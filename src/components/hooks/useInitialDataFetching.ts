import { useEffect } from 'react'

import { useDispatch, useDispatchAlias, useSelector } from 'state/hooks'
import { FETCH_SERVER_LIST } from 'state/slices/servers'
import { FETCH_BEST_LOCATION } from 'state/slices/bestLocation'
import { FETCH_SERVER_CREDENTIALS } from 'state/slices/serverCredentials'
import { applyBestLocationAsAutopilot } from 'state/slices/autopilot'
import { FETCH_NOTIFICATIONS } from 'state/slices/newsfeed'
import { setOriginalUserAgent, FETCH_USER_AGENTS_LIST } from 'state/slices/userAgent'
import { setAutoConnectAfterLogin } from 'state/slices/autoConnectAfterLogin'
import sendMessage from 'services/runtime/sendMessage'

// This function could be used as a periodical data-fetcher after small refactoring
export default (): void => {
  const dispatch = useDispatch()
  const dispatchAlias = useDispatchAlias()

  const bestLocationLoading = useSelector(s => s.bestLocation.loading)
  const isPremium = useSelector(s => s.session.sessionData?.is_premium)
  const sessionAuthHash = useSelector(s => s.session.sessionData?.session_auth_hash)
  const serverListLoading = useSelector(s => s.servers.loading)
  const autopilotData = useSelector(state => state.autopilot.autopilotData)
  const newsfeedLoading = useSelector(state => state.newsfeed.loading)
  const username = useSelector(state => state.serverCredentials.username)
  const password = useSelector(state => state.serverCredentials.password)
  const userAgentLoading = useSelector(state => state.userAgent.loading)
  const userAgentOriginal = useSelector(state => state.userAgent.original)
  const autoConnectAfterLogin = useSelector(state => state.autoConnectAfterLogin)
  const status = useSelector(s => s.proxy.status)

  useEffect(() => {
    if (!userAgentOriginal) {
      dispatch(setOriginalUserAgent(navigator.userAgent))
    }
  }, [userAgentOriginal, dispatch])

  useEffect(() => {
    if (sessionAuthHash && !(username && password)) {
      dispatchAlias(FETCH_SERVER_CREDENTIALS)
    }
  }, [sessionAuthHash, password, username, dispatchAlias])

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

  useEffect(() => {
    if (sessionAuthHash && ['idle', 'rejected'].includes(userAgentLoading)) {
      dispatchAlias(FETCH_USER_AGENTS_LIST)
    }
    // Do NOT add dispatchAlias to Dependency array. It leads to double network requests. Don't know why.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionAuthHash, userAgentLoading])

  useEffect(() => {
    const dispatchConnectToAutopilot = async () => await sendMessage({ what: 'connectAutopilot' })

    if (
      autoConnectAfterLogin &&
      serverListLoading === 'fulfilled' &&
      bestLocationLoading === 'fulfilled' &&
      status !== 'on' &&
      status !== 'connecting'
    ) {
      dispatchConnectToAutopilot()
      dispatch(setAutoConnectAfterLogin(false))
    }
  }, [
    status,
    serverListLoading,
    bestLocationLoading,
    autoConnectAfterLogin,
    dispatch,
    dispatchAlias,
  ])
}
