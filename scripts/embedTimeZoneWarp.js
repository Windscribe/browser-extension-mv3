const sha256 = require('crypto-js/sha256')
const fs = require('fs')
const path = require('path')
const util = require('node:util')
const exec = util.promisify(require('node:child_process').exec)

const timeZoneWarpContentScriptTemplate = require('./buildUtils/templates/timeZoneWarpContentScript')
const getTimeWarp = require('./buildUtils/utils/getTimeWarp')

async function embedTimeZoneWarp(config, serverListData) {
  const timeZones = serverListData.data
    .map(server => {
      return { id: server.id, tz: server.tz }
    })
    .filter(timeZone => timeZone.tz)
    .map(timeZone => {
      return {
        id: timeZone.id,
        tz: getTimeWarp(timeZone.tz),
      }
    })
    .filter(
      timeZone =>
        timeZone.tz &&
        timeZone.tz.offset !== null &&
        timeZone.tz.offset !== undefined &&
        timeZone.tz.desiredTimezone !== null &&
        timeZone.tz.desiredTimezone !== undefined,
    )
    .map(spoofedTime => {
      return {
        // cannot pass in number to sha256
        fileName: sha256(spoofedTime.id.toString()).toString() + 'tzw',
        content: timeZoneWarpContentScriptTemplate({
          timezone: spoofedTime.tz.desiredTimezone,
          offset: spoofedTime.tz.offset.toString(),
        }),
      }
    })

  //  using fixed paths
  const timeZoneWarpGeneratedScriptFolderPath = 'src/pages/contentScripts/timeZoneWarp/'

  // clear older embedded files except .gitkeep
  const files = fs.readdirSync(timeZoneWarpGeneratedScriptFolderPath)

  for (let file of files) {
    if (file === '.gitkeep') {
      continue
    } else {
      fs.rmSync(timeZoneWarpGeneratedScriptFolderPath + file)
    }
  }

  //  write to src folder which will be included in the build
  for (let timeZone of timeZones) {
    const filePath = timeZoneWarpGeneratedScriptFolderPath + timeZone.fileName + '.js'
    fs.writeFileSync(filePath, timeZone.content)
    //  update webpack config entry object to inlcude the newly generated files
    config.entry[timeZone.fileName] = path.join(
      __dirname,
      '..',
      'src',
      'pages',
      'contentScripts',
      'timeZoneWarp',
      timeZone.fileName + '.js',
    )
  }

  const formatTimeZoneWarpFiles = `eslint --fix ${timeZoneWarpGeneratedScriptFolderPath}`

  await exec(formatTimeZoneWarpFiles)

  console.log('Time zone warp content scripts embedded into build')
}

module.exports = embedTimeZoneWarp
