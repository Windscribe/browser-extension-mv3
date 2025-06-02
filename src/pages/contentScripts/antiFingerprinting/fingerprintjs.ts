;(() => {
  // anti fingerprinting
  // todo: make subtle changes to the value and duration instead of just hanging
  // https://dev.fingerprint.com/docs/identification-accuracy-and-confidence
  // they use probalistic and deterministic fingerprinting techniques
  // we spoof a comibnation of both, still a long ways to go to beat them, but
  // not impossible

  const OriginalPromise = Promise

  window.Promise = new Proxy(OriginalPromise, {
    construct(target, args) {
      const [executor] = args
      const promise = new target((resolve, reject) => {
        const isFingerprintingData = (obj: any): boolean => {
          if (!obj || typeof obj !== 'object') return false

          // Look for patterns like s1, s2, s3... with value/duration structure
          let matchCount = 0
          let totalProps = 0

          for (const key in obj) {
            totalProps++
            if (
              /^s\d+$/.test(key) && // Key matches 's' followed by numbers
              obj[key]?.value !== undefined && // Has value property
              obj[key]?.duration !== undefined // Has duration property
            ) {
              matchCount++
            }
          }

          // If more than 50% of properties match the pattern, likely fingerprinting
          return totalProps > 10 && matchCount / totalProps > 0.5
        }

        const wrappedResolve = (value: any) => {
          if (isFingerprintingData(value)) {
            return
          }

          resolve(value)
        }
        executor(wrappedResolve, reject)
      })
      return promise
    },
    get(target, prop) {
      if (prop === Symbol.toStringTag) return 'Promise'
      if (prop === 'constructor') return OriginalPromise
      return target[prop as keyof typeof target]
    },
  })
})()
