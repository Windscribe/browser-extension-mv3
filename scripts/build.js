require('dotenv').config()
const login = require('./login')
const webpack = require('webpack')
const config = require('../webpack.config')
const embedUserAgentsForSplitPersonality = require('./embedUserAgentsSplitPersonality')
const embedLocationWarp = require('./embedLocationWarp')

delete config.chromeExtensionBoilerplate
;(async () => {
  config.mode = 'production'

  const sessionData = await login()
  await embedUserAgentsForSplitPersonality(config, sessionData)
  await embedLocationWarp(config, sessionData)

  webpack(config, function (err) {
    if (err) throw err
  })
})()
