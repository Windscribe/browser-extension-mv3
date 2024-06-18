require('dotenv').config()
const webpack = require('webpack')
const config = require('../webpack.config')
const embedUserAgentForSplitPersonality = require('./embedUserAgentsSplitPersonality')

delete config.chromeExtensionBoilerplate
;(async () => {
  config.mode = 'production'

  await embedUserAgentForSplitPersonality(config)

  webpack(config, function (err) {
    if (err) throw err
  })
})()
