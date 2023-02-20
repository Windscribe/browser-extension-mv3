type TemplateType = chrome.notifications.TemplateType
type CreateNotificationOptions = {
  message: string
  iconUrl: string
  title?: string
  type?: TemplateType
}

export default function ({
  message,
  iconUrl,
  title = 'Windscribe',
  type = 'basic',
}: CreateNotificationOptions): void {
  chrome.notifications.create({
    type,
    iconUrl,
    title,
    message,
  })
}
