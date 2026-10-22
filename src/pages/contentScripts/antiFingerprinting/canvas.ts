;(() => {
  // Generate random RGB noise values (0-10)
  const noise = {
    r: Math.floor(Math.random() * 10),
    g: Math.floor(Math.random() * 10),
    b: Math.floor(Math.random() * 10),
  }

  // Random value for quality adjustment (0-0.05)
  const qualityNoise = Math.random() * 0.05

  // Main canvas spoofing function
  const spoofCanvas = function (originalFunction: any, canvas: any, args: any) {
    // Normalize first arg for type checks (may be undefined or include parameters)
    const typeCandidate = (args as any)[0]
    const normalizedType = String(typeCandidate ?? '')
      .toLowerCase()
      .split(';', 1)[0]

    // Handle PNG format (default when no args OR explicit image/png)
    if ((args as any).length === 0 || normalizedType === 'image/png') {
      const width = canvas.width
      const height = canvas.height
      const ctx = canvas.getContext('2d', { willReadFrequently: true })

      if (ctx !== null) {
        try {
          const imageData = ctx.getImageData(0, 0, width, height)

          // Divide canvas into 7x7 grid
          const gridHeight = Math.max(1, Math.floor(height / 7))
          const gridWidth = Math.max(1, Math.floor(width / 7))

          // Add noise to one random pixel in each grid cell
          for (let y = 0; y < height; y += gridHeight) {
            for (let x = 0; x < width; x += gridWidth) {
              const pixelIndex =
                ((y + Math.floor(Math.random() * gridHeight)) * width +
                  (x + Math.floor(Math.random() * gridWidth))) *
                4

              if (pixelIndex < imageData.data.length) {
                imageData.data[pixelIndex + 0] += noise.r // Red
                imageData.data[pixelIndex + 1] += noise.g // Green
                imageData.data[pixelIndex + 2] += noise.b // Blue
              }
            }
          }

          ctx.putImageData(imageData, 0, 0)
        } catch {
          // Tainted canvas or read error: fall back to native behavior
          return (args as any).length === 0
            ? originalFunction.call(canvas)
            : originalFunction.apply(canvas, args)
        }
      }

      // Explicitly call native with appropriate arguments
      return (args as any).length === 0
        ? originalFunction.call(canvas)
        : originalFunction.apply(canvas, args)
    }

    // Handle JPEG/WEBP quality only
    const type = normalizedType
    if (type === 'image/jpeg' || type === 'image/webp') {
      const rawQ = (args as any).length > 1 ? Number((args as any)[1]) : undefined
      const q = Number.isFinite(rawQ) ? (rawQ as number) : null
      const newQ = Math.min(
        1,
        Math.max(0, q == null ? 0.5 + qualityNoise : q > 0.9 ? q - qualityNoise : q + qualityNoise),
      )
      return originalFunction.call(canvas, type, newQ)
    }

    // Fallback: defer to native with provided arguments
    return originalFunction.apply(canvas, args)
  }

  // Apply the spoofing to canvas toDataURL method
  const originalToDataURL = HTMLCanvasElement.prototype.toDataURL
  HTMLCanvasElement.prototype.toDataURL = function () {
    // eslint-disable-next-line prefer-rest-params
    return spoofCanvas(originalToDataURL, this, arguments)
  }

  // Add getImageData spoofing
  const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData
  CanvasRenderingContext2D.prototype.getImageData = function () {
    // eslint-disable-next-line prefer-rest-params
    const imageData = originalGetImageData.apply(this, arguments as any)
    const { width, height } = imageData
    const gridHeight = Math.max(1, Math.floor(height / 7))
    const gridWidth = Math.max(1, Math.floor(width / 7))

    for (let y = 0; y < height; y += gridHeight) {
      for (let x = 0; x < width; x += gridWidth) {
        const pixelIndex =
          ((y + Math.floor(Math.random() * gridHeight)) * width +
            (x + Math.floor(Math.random() * gridWidth))) *
          4

        if (pixelIndex < imageData.data.length) {
          imageData.data[pixelIndex + 0] += noise.r
          imageData.data[pixelIndex + 1] += noise.g
          imageData.data[pixelIndex + 2] += noise.b
        }
      }
    }
    return imageData
  }
})()
