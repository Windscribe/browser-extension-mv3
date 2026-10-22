;(() => {
  if (navigator.share) {
    navigator.share = function () {
      return Promise.resolve() // do nothing, but still behave like the real API
    }
  }
})()
