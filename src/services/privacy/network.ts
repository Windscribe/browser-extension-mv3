const blockWebRtc = async (): Promise<void> =>
  await chrome.privacy.network.webRTCIPHandlingPolicy.set({
    value: 'disable_non_proxied_udp',
  })

const resetWebRtcSettings = async (): Promise<void> =>
  await chrome.privacy.network.webRTCIPHandlingPolicy.set({ value: 'default' })

export { blockWebRtc, resetWebRtcSettings }
