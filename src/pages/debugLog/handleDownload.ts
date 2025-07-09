export const handleDownloadLogs = (userInfo: string, parsedLog: string): void => {
  const content = `${userInfo}\n\n[Start of log]\n------------------------------------------------------\n${parsedLog}`
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'debug-logs.txt'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
