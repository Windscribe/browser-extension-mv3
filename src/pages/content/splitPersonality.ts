export default function splitPersonality(userAgent: string): void {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: userAgent,
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'appVersion', {
    value: userAgent,
    configurable: true,
  })
  Object.defineProperty(window.navigator, 'userAgentData', {
    value: undefined,
    configurable: true,
  })
}
