import { useEffect, useMemo } from 'react'

import { useDispatch, useDispatchAlias, useSelector } from 'state/hooks'
import { FETCH_SERVER_LIST } from 'state/slices/servers'
import { FETCH_BEST_LOCATION } from 'state/slices/bestLocation'
import { FETCH_SERVER_CREDENTIALS } from 'state/slices/serverCredentials'
import { applyBestLocationAsAutopilot } from 'state/slices/autopilot'
import { initializeUserAgentsList, setOriginalUserAgent } from 'state/slices/userAgent'
import { setAutoConnectAfterLogin } from 'state/slices/autoConnectAfterLogin'
import sendMessage from 'services/runtime/sendMessage'
import { registerScript } from 'utils/scriptController'
import {
  audioAntiFingerprintingScriptId,
  canvasAntiFingerprintingScriptId,
  fingerprintjsAntiFingerprintingScriptId,
  fingerprintMessageListenerScriptId,
  fontAntiFingerprintingScriptId,
  screenResAntiFingerprintingScriptId,
  splitPersonalityScriptId,
  workerBlockScriptId,
} from 'utils/constants'
import { SHA256 } from 'crypto-js'
import transformAllowListToExcludeMatches from 'utils/transformAllowListToExcludeMatches'
import { enableBlockNotifications } from 'state/slices/notificationBlockerEnabled'
import { enableBlockWebRtc } from 'state/slices/webRtcEnabled'

// This function could be used as a periodical data-fetcher after small refactoring
export default (): void => {
  const dispatch = useDispatch()
  const dispatchAlias = useDispatchAlias()

  const bestLocationLoading = useSelector(s => s.bestLocation.loading)
  const isPremium = useSelector(s => s.session.sessionData?.is_premium)
  const sessionAuthHash = useSelector(s => s.session.sessionData?.session_auth_hash)
  const serverListLoading = useSelector(s => s.servers.loading)
  const autopilotData = useSelector(state => state.autopilot.autopilotData)
  const username = useSelector(state => state.serverCredentials.username)
  const password = useSelector(state => state.serverCredentials.password)
  const userAgentOriginal = useSelector(state => state.userAgent.original)
  const autoConnectAfterLogin = useSelector(state => state.autoConnectAfterLogin)
  const status = useSelector(s => s.proxy.status)
  const isWorkerBlockActive = useSelector(s => s.workerBlock)
  const isSplitPersonalityEnabled = useSelector(s => s.splitPersonalityEnabled)
  const spoofedUserAgent = useSelector(s => s.userAgent.spoofed)
  const allowList = useSelector(s => s.allowlist)
  const isNotificationBlockerActive = useSelector(s => s.notificationBlockerEnabled)
  const isWebRTCBlockerEnabled = useSelector(s => s.webRtcEnabled)
  const isAntiFingerprintingActive = useSelector(s => s.antiFingerprinting)

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
    // initialize here
    dispatch(initializeUserAgentsList())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const excludeMatchesFromAllowList = useMemo(() => {
    return transformAllowListToExcludeMatches(allowList)
  }, [allowList])

  useEffect(() => {
    if (isWorkerBlockActive) {
      registerScript(
        workerBlockScriptId,
        ['workerBlockContentScript.bundle.js'],
        excludeMatchesFromAllowList,
      )
    }
  }, [isWorkerBlockActive, excludeMatchesFromAllowList])

  useEffect(() => {
    if (isAntiFingerprintingActive) {
      registerScript(
        fontAntiFingerprintingScriptId,
        ['fontAntiFingerprinting.bundle.js'],
        excludeMatchesFromAllowList,
      )

      registerScript(
        screenResAntiFingerprintingScriptId,
        ['screenResAntiFingerprinting.bundle.js'],
        excludeMatchesFromAllowList,
      )

      registerScript(
        canvasAntiFingerprintingScriptId,
        ['canvasAntiFingerprinting.bundle.js'],
        excludeMatchesFromAllowList,
      )

      registerScript(
        audioAntiFingerprintingScriptId,
        ['audioAntiFingerprinting.bundle.js'],
        excludeMatchesFromAllowList,
      )

      registerScript(
        fingerprintjsAntiFingerprintingScriptId,
        ['fingerprintjsAntiFingerprinting.bundle.js'],
        excludeMatchesFromAllowList,
      )

      registerScript(
        fingerprintMessageListenerScriptId,
        ['fingerprintMessageListener.bundle.js'],
        excludeMatchesFromAllowList,
        'ISOLATED',
      )
    }
  }, [isAntiFingerprintingActive, excludeMatchesFromAllowList])

  useEffect(() => {
    if (isSplitPersonalityEnabled && spoofedUserAgent) {
      registerScript(
        splitPersonalityScriptId,
        [SHA256(spoofedUserAgent).toString() + '.bundle.js'],
        excludeMatchesFromAllowList,
      )
    }
  }, [isSplitPersonalityEnabled, spoofedUserAgent, excludeMatchesFromAllowList])

  useEffect(() => {
    if (isNotificationBlockerActive) {
      dispatch(enableBlockNotifications())
    }
  }, [isNotificationBlockerActive, dispatch])

  useEffect(() => {
    if (isWebRTCBlockerEnabled) {
      dispatch(enableBlockWebRtc())
    }
  }, [isWebRTCBlockerEnabled, dispatch])
}
