import { UAParser } from 'ua-parser-js'

const getChromeVersion = (): number => {
  const chromeVersion = new UAParser().getBrowser().version
  const parsedVersion = chromeVersion ? parseInt(chromeVersion, 10) : NaN
  return parsedVersion
}

export { getChromeVersion }
