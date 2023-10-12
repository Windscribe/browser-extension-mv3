export default function workerBlock(): void {
  Object.defineProperty(window, 'Worker', {
    value: {},
    configurable: true,
  })

  Object.defineProperty(window, 'SharedWorker', {
    value: {},
    configurable: true,
  })

  Object.defineProperty(window.navigator, 'serviceWorker', {
    value: {},
    configurable: true,
  })
}
