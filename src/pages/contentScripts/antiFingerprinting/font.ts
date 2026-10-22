;(() => {
  // Helper function to get a random float between -0.05 and 0.05
  const getRandomOffset = () => {
    const array = new Uint32Array(1)
    crypto.getRandomValues(array)
    // Convert to float between -0.05 and 0.05
    return (array[0] / 2 ** 32) * 0.1 - 0.05
  }

  // Main function that handles dimension measurements
  const modifyDimension = function (originalFn: any, target: any, args: any) {
    try {
      // Skip if it's not an HTML element
      if (target === HTMLElement.prototype) return void 0

      // Only modify measurements for text elements
      if (target.tagName !== 'IMG' && target.childElementCount === 0 && target.style.fontFamily) {
        return Reflect.apply(originalFn, target, args) + getRandomOffset()
      }
      return Reflect.apply(originalFn, target, args)
    } catch {
      return Reflect.apply(originalFn, target, args)
    }
  }

  // Apply the protection to offsetHeight and offsetWidth
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    get: new Proxy(Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')?.get, {
      apply: modifyDimension,
    }),
  })

  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    get: new Proxy(Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')?.get, {
      apply: modifyDimension,
    }),
  })
})()
