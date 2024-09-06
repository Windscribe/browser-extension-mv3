self.onmessage = function (event) {
  if (event.data === 'nossl_call') {
    fetch('https://nosslscribe.com')
      .then(res => {
        return res.text()
      })
      .then(res =>
        self.postMessage({
          error: null,
          data: JSON.stringify(res),
          message: 'fetched nosslscribe.com',
        }),
      )
      .catch(err => {
        self.postMessage({
          error: JSON.stringify(err),
          data: null,
          message: err.toString(),
        })
      })
  }
}
