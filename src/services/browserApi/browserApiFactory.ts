import edge, { EdgeApiAdapter } from './edge'
import chrome, { ChromeApiAdapter } from './chrome'
import { BROWSER, BrowserName } from 'utils/constants'

type BrowserApiAdapter = ChromeApiAdapter | EdgeApiAdapter

type BrowserApis = {
  [K in BrowserName]: BrowserApiAdapter
}

const browserApis: BrowserApis = {
  Chrome: chrome,
  Edge: edge,
}

const selectedApi = browserApis[BROWSER]

export default selectedApi
