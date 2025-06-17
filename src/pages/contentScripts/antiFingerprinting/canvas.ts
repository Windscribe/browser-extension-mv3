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
    // Handle PNG format
    if (args.length == 0 || args[0] === 'image/png') {
      const width = canvas.width
      const height = canvas.height
      const ctx = canvas.getContext('2d', { willReadFrequently: true })

      if (ctx !== null) {
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
      }
    }
    // Handle JPEG and other formats
    else {
      if (args.length === 1) {
        args.push(0.5 + qualityNoise)
      } else {
        args[1] = args[1] > 0.9 ? args[1] - qualityNoise : args[1] + qualityNoise
      }
    }

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
