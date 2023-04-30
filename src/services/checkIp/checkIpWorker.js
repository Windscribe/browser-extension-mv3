const controller = new AbortController()
const timeoutId = setTimeout(() => controller.abort(), 5000)

await fetch('https://nosslscribe.com', {
  signal: controller.signal,
})

clearTimeout(timeoutId)
