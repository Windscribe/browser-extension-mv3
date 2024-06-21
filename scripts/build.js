require('dotenv').config()
const login = require('./login')
const webpack = require('webpack')
const config = require('../webpack.config')
const embedUserAgentsForSplitPersonality = require('./embedUserAgentsSplitPersonality')
const embedLocationWarp = require('./embedLocationWarp')
const embedLanguageWarp = require('./embedLanguageWarp')

delete config.chromeExtensionBoilerplate
;(async () => {
  config.mode = 'production'

  const sessionData = await login()
  await embedUserAgentsForSplitPersonality(config, sessionData)
  await embedLocationWarp(config, sessionData)
  await embedLanguageWarp(config, sessionData)

  webpack(config, function (err) {
    if (err) throw err
  })
})()
