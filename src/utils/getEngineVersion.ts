import { pushToDebugLog } from 'services/debugLog'
import { UAParser } from 'ua-parser-js'

const getChromiumEngineVersion = (): number => {
  // the extension at this point only works with chromium based browsers
  // detects the underlying chromium engine version and not the browser version
  // eg "131.0.0.0" is parsed to 131 we only care about the major version

  const engine = new UAParser().getEngine()
  const version = engine.version
  const parsedVersion = version ? parseInt(version, 10) : NaN

  pushToDebugLog({
    message: `Chromium engine version: ${parsedVersion} detected`,
  })

  return parsedVersion
}

export { getChromiumEngineVersion }
