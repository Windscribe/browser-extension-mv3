import type { Coords } from 'utils/types'

export default function locationWarp(options: Coords): void {
  const handler = {
    apply(target: any, self: any, args: any) {
      const funcCopy = args[0]
      args[0] = function (position: any) {
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
    // Need to test with Object.getPrototypeOf(navigator.geolocation)
    ;(navigator.geolocation as any).__proto__.getCurrentPosition = new Proxy(
      (navigator.geolocation as any).__proto__.getCurrentPosition,
      handler,
    )(navigator.geolocation as any).__proto__.watchPosition = new Proxy(
      (navigator.geolocation as any).__proto__.watchPosition,
      handler,
    )
  }
}
