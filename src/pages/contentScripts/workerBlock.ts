;(() => {
  // worker block
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

  console.log('workerBlock active')
})()
