const fetch = require('node-fetch-commonjs')
const sha256 = require('crypto-js/sha256')
const fs = require('node:fs/promises')
const path = require('path')
const util = require('node:util')
const exec = util.promisify(require('node:child_process').exec)

const getBaseApiUrl = require('./buildUtils/api/getBaseApiUrl')
const locationWarpContentScriptTemplate = require('./buildUtils/templates/locationWarpContentScript')

async function embedLocationWarp(config, sessionData) {
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

  const dataCenterGpsCoords = serverListData.data
    .map(server => server?.groups ?? [])
    .flat(10)
    .map(dataCenter => {
      return {
        id: dataCenter.id,
        gps: dataCenter.gps?.split(','),
      }
    })
    .filter(data => {
      return data.id !== undefined && data.id !== null && data.gps
    })
    .map(dataCenter => {
      return {
        // cannot pass in number to sha256
        fileName: sha256(dataCenter.id.toString()).toString() + 'lcw',
        content: locationWarpContentScriptTemplate({
          latitude: dataCenter.gps[0],
          longitude: dataCenter.gps[1],
        }),
      }
    })

  // using fixed paths
  const locationWarpGeneratedScriptFolderPath = 'src/pages/contentScripts/locationWarp/'

  // write to src folder which will be included in the build
  for (let coords of dataCenterGpsCoords) {
    const filePath = locationWarpGeneratedScriptFolderPath + coords.fileName + '.ts'
    await fs.writeFile(filePath, coords.content)
    //  update webpack config entry object to inlcude the newly generated files
    config.entry[coords.fileName] = path.join(
      __dirname,
      '..',
      'src',
      'pages',
      'contentScripts',
      'locationWarp',
      coords.fileName + '.ts',
    )
  }

  const formatLocationWarpFiles = `eslint --fix ${locationWarpGeneratedScriptFolderPath}`

  await exec(formatLocationWarpFiles)

  console.log('Location warp content scripts embedded into build')
}

module.exports = embedLocationWarp
