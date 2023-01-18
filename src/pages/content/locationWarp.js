{
  const options = JSON.parse(locationWarpInfo)

  const handler = {
    apply(target, self, args) {
      const funcCopy = args[0]
      args[0] = function (position) {
        if ('timestamp' in position) {
          Object.defineProperty(position, 'timestamp', {
            value: Date.now(),
          })
        }
        if ('coords' in position) {
          Object.defineProperty(position.coords, 'latitude', {
            value: options.latitude ? options.latitude : null,
          })
          Object.defineProperty(position.coords, 'longitude', {
            value: options.longitude ? options.longitude : null,
          })
          Object.defineProperty(position.coords, 'speed', {
            value: null,
          })
          Object.defineProperty(position.coords, 'heading', {
            value: null,
          })
          Object.defineProperty(position.coords, 'accuracy', {
            value: 20000,
          })
          Object.defineProperty(position.coords, 'altitude', {
            value: null,
          })
          Object.defineProperty(position.coords, 'altitudeAccuracy', {
            value: null,
          })
        }
        funcCopy(position)
      }
      return target.apply(self, args)
    },
  }

  if (navigator && navigator.geolocation) {
    navigator.geolocation.__proto__.getCurrentPosition = new Proxy(
      navigator.geolocation.__proto__.getCurrentPosition,
      handler,
    )

    navigator.geolocation.__proto__.watchPosition = new Proxy(
      navigator.geolocation.__proto__.watchPosition,
      handler,
    )
  }
}
