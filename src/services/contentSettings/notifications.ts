const blockNotifications = async (): Promise<void> =>
  await chrome.contentSettings.notifications.set({
    primaryPattern: '<all_urls>',
    setting: 'block',
    scope: 'regular',
  })

const resetNotificationSettings = async (): Promise<void> =>
  await chrome.contentSettings.notifications.clear({
    scope: 'regular',
  })

export { blockNotifications, resetNotificationSettings }
