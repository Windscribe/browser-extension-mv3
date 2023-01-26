const blockWebRtc = async (): Promise<void> =>
  await chrome.privacy.network.webRTCIPHandlingPolicy.set({
    value: 'disable_non_proxied_udp',
  })

const resetWebRtcSettings = async (): Promise<void> =>
  await chrome.privacy.network.webRTCIPHandlingPolicy.set({ value: 'default' })

type WebRtcDetails = Promise<chrome.types.ChromeSettingGetResultDetails>
const getWebRtcSettings = async (): WebRtcDetails =>
  (await chrome.privacy.network.webRTCIPHandlingPolicy.get({})) as unknown as WebRtcDetails

export { blockWebRtc, resetWebRtcSettings, getWebRtcSettings }
