;(() => {
  function createAudioSpoofing() {
    // 1. Spoof AudioBuffer.getChannelData
    const originalGetChannelData = AudioBuffer.prototype.getChannelData
    AudioBuffer.prototype.getChannelData = function (channel) {
      const audioData = originalGetChannelData.call(this, channel)

      // Add small random noise to every sample
      for (let i = 0; i < audioData.length; i++) {
        audioData[i] += (Math.random() - 0.5) * 0.0001 // ±0.00005
      }

      return audioData
    }

    // 2. Spoof DynamicsCompressor
    const originalCreateDynamicsCompressor = AudioContext.prototype.createDynamicsCompressor
    AudioContext.prototype.createDynamicsCompressor = function () {
      const compressor = originalCreateDynamicsCompressor.call(this)

      // Helper function to create a randomized getter/setter for a parameter
      function spoofParameter(param: any, range: number) {
        const originalValue = param.value
        let currentValue = originalValue
        Object.defineProperty(param, 'value', {
          get: function () {
            return currentValue + (Math.random() * range - range / 2)
          },
          set: function (value) {
            currentValue = value + (Math.random() * range - range / 2)
          },
        })
      }

      // Spoof all parameters with random variations
      spoofParameter(compressor.threshold, 10) // ±5
      spoofParameter(compressor.knee, 8) // ±4
      spoofParameter(compressor.ratio, 6) // ±3
      spoofParameter(compressor.attack, 0.2) // ±0.1
      spoofParameter(compressor.release, 0.4) // ±0.2

      // Spoof reduction read-only property
      const originalReduction = compressor.reduction
      Object.defineProperty(compressor, 'reduction', {
        get: function () {
          return originalReduction + (Math.random() * 8 - 4) // ±4
        },
      })

      return compressor
    }

    // 3. Spoof OscillatorNode
    const originalCreateOscillator = AudioContext.prototype.createOscillator
    AudioContext.prototype.createOscillator = function () {
      const oscillator = originalCreateOscillator.call(this)
      // Add small random variations to frequency
      const originalFrequency = oscillator.frequency.value
      Object.defineProperty(oscillator.frequency, 'value', {
        get: function () {
          return originalFrequency + Math.random() * 0.1 - 0.05
        },
      })
      return oscillator
    }

    // 4. Spoof AnalyserNode
    const originalCreateAnalyser = AudioContext.prototype.createAnalyser
    AudioContext.prototype.createAnalyser = function () {
      const analyser = originalCreateAnalyser.call(this)
      const originalGetFloatFrequencyData = analyser.getFloatFrequencyData
      analyser.getFloatFrequencyData = function (array) {
        originalGetFloatFrequencyData.call(this, array)
        // Add small random variations to frequency data
        for (let i = 0; i < array.length; i++) {
          array[i] += Math.random() * 0.1 - 0.05
        }
      }
      return analyser
    }

    // 5. Spoof AudioContext time and state
    try {
      const descriptor = Object.getOwnPropertyDescriptor(AudioContext.prototype, 'currentTime')
      if (descriptor && descriptor.get) {
        const originalGetCurrentTime = descriptor.get
        Object.defineProperty(AudioContext.prototype, 'currentTime', {
          get: function () {
            const time = originalGetCurrentTime.call(this)
            return time + Math.random() * 0.01
          },
        })
      }
    } catch (error) {
      // snuff out the error
    }
  }

  // Initialize the audio spoofing
  createAudioSpoofing()
})()
