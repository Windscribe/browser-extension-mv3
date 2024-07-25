const fetch = require('node-fetch-commonjs')
const sha256 = require('crypto-js/sha256')
const fs = require('node:fs/promises')
const path = require('path')
const util = require('node:util')
const exec = util.promisify(require('node:child_process').exec)

const getBaseApiUrl = require('./buildUtils/api/getBaseApiUrl')
const timeZoneWarpContentScriptTemplate = require('./buildUtils/templates/timeZoneWarpContentScript')
const getTimeWarp = require('./buildUtils/utils/getTimeWarp')

async function embedTimeZoneWarp(config, sessionData) {
  const loc_hash = sessionData.data?.loc_hash
  const is_premium = sessionData.data?.is_premium
  const alc = sessionData.data?.alc

  if (!loc_hash) {
    throw Error('No loc_hash is available. Try to sign in.')
  }

  const serverListResponse = await fetch(
    `${getBaseApiUrl(true)}serverlist/chrome/${is_premium}/${loc_hash}${
      alc ? `?alc=${alc.join(',')}` : ''
    }`,
  )

  const serverListData = await serverListResponse.json()

  if (!serverListData.data) {
    throw Error('No serverlist is available')
  }

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

  //  write to src folder which will be included in the build
  for (let timeZone of timeZones) {
    const filePath = timeZoneWarpGeneratedScriptFolderPath + timeZone.fileName + '.js'
    await fs.writeFile(filePath, timeZone.content)
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

  console.log('Language warp content scripts embedded into build')
}

module.exports = embedTimeZoneWarp
