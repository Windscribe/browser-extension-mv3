export default (currentLocationTimezone?: string): string =>
  `${new Date().toLocaleTimeString('en-US', {
    timeZone: currentLocationTimezone,
    hour: '2-digit',
    minute: '2-digit',
  })}  (${currentLocationTimezone})`
