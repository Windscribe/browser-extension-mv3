import { GeolocationMethod, GeolocationMethodParameters } from 'api/types'
;(() => {
  const handler = {
    apply(
      target: GeolocationMethod,
      thisArg: Geolocation,
      argumentsList: GeolocationMethodParameters,
    ) {
      const funcCopy: PositionCallback = argumentsList[0]

      argumentsList[0] = function (position: GeolocationPosition) {
        const spoofCoordinatesFor = (obj: GeolocationCoordinates): void => {
          Object.defineProperty(obj, 'latitude', {
            value: 55.95,
          })
          Object.defineProperty(obj, 'longitude', {
            value: -3.19,
          })
          Object.defineProperty(obj, 'speed', {
            value: null,
          })
          Object.defineProperty(obj, 'heading', {
            value: null,
          })
          Object.defineProperty(obj, 'accuracy', {
            value: 20000,
          })
          Object.defineProperty(obj, 'altitude', {
            value: null,
          })
          Object.defineProperty(obj, 'altitudeAccuracy', {
            value: null,
          })
        }

        if ('timestamp' in position) {
          Object.defineProperty(position, 'timestamp', {
            value: Date.now(),
          })
        }

        if ('coords' in position) {
          spoofCoordinatesFor(position.coords)
          spoofCoordinatesFor(GeolocationCoordinates.prototype)
        }

        funcCopy(position)
      }
      return target.apply(thisArg, argumentsList)
    },
  }

  if (window.navigator?.geolocation) {
    Object.getPrototypeOf(navigator.geolocation).getCurrentPosition = new Proxy(
      Object.getPrototypeOf(navigator.geolocation).getCurrentPosition,
      handler,
    )
    Object.getPrototypeOf(navigator.geolocation).watchPosition = new Proxy(
      Object.getPrototypeOf(navigator.geolocation).watchPosition,
      handler,
    )
  }

  console.log('location spoofing active 55.95 -3.19}')
})()
