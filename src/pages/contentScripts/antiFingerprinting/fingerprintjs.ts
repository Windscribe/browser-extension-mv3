;(() => {
  // anti fingerprinting
  // todo: make subtle changes to the value and duration instead of just hanging
  // https://dev.fingerprint.com/docs/identification-accuracy-and-confidence
  // they use probalistic and deterministic fingerprinting techniques
  // we spoof a comibnation of both, still a long ways to go to beat them, but
  // not impossible

  const OriginalPromise = Promise

  // Override the Promise constructor
  window.Promise = class<T> extends OriginalPromise<T> {
    constructor(
      executor: (
        resolve: (value: T | PromiseLike<T>) => void,
        reject: (reason?: any) => void,
      ) => void,
    ) {
      // Wrap the executor to intercept resolution and rejection
      const wrappedExecutor = (
        resolve: (value: T | PromiseLike<T>) => void,
        reject: (reason?: any) => void,
      ) => {
        const wrappedResolve = (value: T | PromiseLike<T>) => {
          // Check if object matches fingerprinting pattern
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

          if (isFingerprintingData(value)) {
            return new Promise(() => {
              // hang in there buddy
            })
          }

          resolve(value)
        }

        return executor(wrappedResolve, reject)
      }

      super(wrappedExecutor)
    }
  }
})()
