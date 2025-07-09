require('dotenv').config()

const login = require('./login')
const getUserAgents = require('./getUa')
const getLocations = require('./getLocations')

const validateEmbeddedUserAgents = require('./buildUtils/outputValidators/validateEmbeddedUserAgents')
const validateEmbeddedLocationWarp = require('./buildUtils/outputValidators/validateEmbeddedLocationWarp')
const validateEmbeddedLanguageWarp = require('./buildUtils/outputValidators/validateEmbeddedLanguageWarp')
const validateEmbeddedTimeZoneWarp = require('./buildUtils/outputValidators/validateEmbeddedTimeZoneWarp')

const webpack = require('webpack')
const config = require('../webpack.config')
const embedUserAgentsForSplitPersonality = require('./embedUserAgentsSplitPersonality')
const embedLocationWarp = require('./embedLocationWarp')
const embedLanguageWarp = require('./embedLanguageWarp')
const embedTimeZoneWarp = require('./embedTimeZoneWarp')

delete config.chromeExtensionBoilerplate
;(async () => {
  config.mode = 'production'

  const sessionData = await login()
  const userAgents = getUserAgents()
  const serverListData = await getLocations(sessionData)

  await embedUserAgentsForSplitPersonality(config, userAgents)
  await embedLocationWarp(config, serverListData)
  await embedLanguageWarp(config, serverListData)
  await embedTimeZoneWarp(config, serverListData)

  webpack(config, async function (err, stats) {
    if (err) {
      console.error('Webpack build error:', err)
    }

    if (stats.hasErrors()) {
      console.error('Webpack build failed with errors:')
      console.error(
        stats.toString({
          chunks: false,
          colors: true,
          errorDetails: true,
          moduleTrace: true,
        }),
      )
      process.exit(1)
    }

    console.log('Validating embedded files')
    await validateEmbeddedUserAgents(userAgents)
    await validateEmbeddedLocationWarp(serverListData)
    await validateEmbeddedLanguageWarp(serverListData)
    await validateEmbeddedTimeZoneWarp(serverListData)
    console.log('Validated embedded files - check build folder too!')
  })
})()
