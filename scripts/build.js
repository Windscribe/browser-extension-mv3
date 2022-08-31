require('dotenv').config()
const webpack = require('webpack')
const config = require('../webpack.config')

delete config.chromeExtensionBoilerplate

config.mode = 'production'

webpack(config, function (err) {
  if (err) throw err
})
