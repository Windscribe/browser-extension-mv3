;(() => {
  const originalWidth = window.screen.availWidth
  const originalHeight = window.screen.availHeight

  // Calculate random variations (±0.625% of original dimensions)
  const maxWidthVariation = Math.floor(originalWidth / 80)
  const maxHeightVariation = Math.floor(originalHeight / 80)

  const randomWidthVariation = Math.floor(Math.random() * maxWidthVariation - maxWidthVariation / 2)
  const randomHeightVariation = Math.floor(
    Math.random() * maxHeightVariation - maxHeightVariation / 2,
  )

  const modifiedWidth = originalWidth + randomWidthVariation
  const modifiedHeight = originalHeight + randomHeightVariation

  // Create proxy for window.screen
  const screenProxy = new Proxy(window.screen, {
    get: function (target, property) {
      // Return modified dimensions
      if (property === 'availWidth' || property === 'width') return modifiedWidth
      if (property === 'availHeight' || property === 'height') return modifiedHeight
      // Get original property
      const value = target[property as keyof Screen]

      // Preserve method functionality
      if (typeof value === 'function') {
        return function (this: unknown, ...args: unknown[]) {
          return Reflect.apply(value, target, args)
        }
      }

      // Return unmodified properties
      return value
    },
  })

  // Replace window.screen with proxied version
  Object.defineProperty(window, 'screen', {
    get: function () {
      return screenProxy
    },
  })
})()
