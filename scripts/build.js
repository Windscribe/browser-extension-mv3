require('dotenv').config()
const webpack = require('webpack')
const config = require('../webpack.config')
const embedUserAgentsForSplitPersonality = require('./embedUserAgentsSplitPersonality')

delete config.chromeExtensionBoilerplate
;(async () => {
  config.mode = 'production'

  await embedUserAgentsForSplitPersonality(config)

  webpack(config, function (err) {
    if (err) throw err
  })
})()
